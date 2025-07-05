//Inicialização de Variáveis
let mapInitialized = false;
let map;

//Função para alternar entre seções da interface
function showSection(id) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  //Bloqueia acesso às ocorrências se não estiver logado
  if (id === 'ocorrencias' && !usuario) {
    alert("Você precisa estar logado para acessar as ocorrências.");
    return;
  }
  //Esconde todas as seções e mostra apenas a desejada
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  //Inicializa o mapa apenas uma vez
  if (id === 'ocorrencias' && !mapInitialized) {
    setTimeout(() => {
      inicializarMapa();
      loadPointsList();
      map.invalidateSize();
      mapInitialized = true;
    }, 100);
  }
}

//Inicialização do Mapa
function inicializarMapa() {
  map = L.map('map').setView([-26.8233, -49.2706], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  map.setMinZoom(7);
  map.setMaxBounds([
    [-28.5, -53],
    [-25.5, -47]
  ]);

  map.on('click', onMapClick);

  const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];
  savedPoints.forEach(point => addMarkerToMap(point));
}

//Clique no Mapa para adicionar ocorrência 
function onMapClick(e) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent("<strong>⚠️ Você precisa estar logado para registrar uma ocorrência.</strong>")
      .openOn(map);
    return;
  }
  const latlng = e.latlng;
  const popupContent = `
    <form id="pointForm">
      <label>Nome:<br><input type="text" id="pointName" required></label><br>
      <label>Descrição:<br><textarea id="pointDesc" required></textarea></label><br>
      <label for="tipoOcorrencia">Selecione o tipo de ocorrência:</label>
      <br>
        <select id="tipoOcorrencia" name="tipoOcorrencia">
      <option value="">-- Escolha uma opção --</option>
      <option value="infraestrutura">Infraestrutura</option>
      <option value="cabos-rompidos">Cabos Rompidos</option>
      <option value="lixo">Lixo</option>
      <option value="melhorias">Melhorias</option>
        </select>
      <label>Imagem (máx 2MB):<br><input type="file" id="pointImage"></label><br>
      <button type="submit">Salvar</button>
    </form>
  `;
  const popup = L.popup()
    .setLatLng(latlng)
    .setContent(popupContent)
    .openOn(map);
  setTimeout(() => {
    document.getElementById('pointForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('pointName').value;
      const description = document.getElementById('pointDesc').value;
      const imageFile = document.getElementById('pointImage').files[0];
      const tipoOcorrencia = document.getElementById('tipoOcorrencia').value;
      if (imageFile && imageFile.size > 2 * 1024 * 1024) {
        alert("Imagem muito grande! Máximo: 2MB.");
        return;
      }
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
          savePoint(name, description, latlng, reader.result, 1,tipoOcorrencia);
        };
        reader.readAsDataURL(imageFile);
      } else {
        savePoint(name, description, latlng, '', 1,tipoOcorrencia);
      }
    });
  }, 100);
}

//Salvar novo ponto
function savePoint(name, description, latlng, imageUrl, votes = 1,tipoOcorrencia) {
  const newPoint = {
    name,
    description,
    lat: latlng.lat,
    lng: latlng.lng,
    imageUrl: imageUrl || '',
    tipoOcorrencia,
    votes
  };
  const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];
  savedPoints.push(newPoint);
  localStorage.setItem('mapPoints', JSON.stringify(savedPoints));
  addMarkerToMap(newPoint);
  loadPointsList();
  map.closePopup();
}

//Cria ícone colorido para marcador do mapa
function createColoredIcon(color) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

//cor do marcador com base na quantidade de votos 
function getMarkerColor(votes) {
  if (votes < 5) return 'blue';
  if (votes < 10) return 'orange';
  if (votes < 15) return 'red';
  return 'black';
}

//Adiciona marcador ao mapa
function addMarkerToMap(point) {
  const icon = createColoredIcon(getMarkerColor(point.votes));

  const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);

  const popupContent = `
    <strong>${point.name}</strong><br>
    ${point.description}<br>
    ${point.imageUrl ? `<img src="${point.imageUrl}" width="100" /><br>` : ''}
    <strong>Votos:</strong> <span id="votes-${point.lat}-${point.lng}">${point.votes}</span><br>
    <strong><span id= "tipoOcorrencia">${point.tipoOcorrencia}</span></strong><br>
    <button onclick="votePoint(${point.lat}, ${point.lng})">👍 Votar</button>
  `;

  marker.bindPopup(popupContent);
}

// Função de voto
function votePoint(lat, lng) {
  const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];
  const pointIndex = savedPoints.findIndex(p => p.lat === lat && p.lng === lng);
  if (pointIndex !== -1) {
    savedPoints[pointIndex].votes += 1;
    localStorage.setItem('mapPoints', JSON.stringify(savedPoints));
    loadPointsList(); // se necessário para atualizar a lista de ocorrências

    const votoSpan = document.getElementById("votes-" + savedPoints[pointIndex].lat + "-" + savedPoints[pointIndex].lng);
    votoSpan.textContent = savedPoints[pointIndex].votes;
  }
}

// Carrega e exibe lista de pontos salvos no localStorage
function loadPointsList() {
  const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];

  savedPoints.sort((a, b) => {
    if (b.votes === a.votes) {
      return a.name.localeCompare(b.name);
    }
    return b.votes - a.votes;
  });

  const listContainer = document.getElementById('pointsList');
  listContainer.innerHTML = '';

  if (savedPoints.length === 0) {
    listContainer.innerHTML = '<p>Nenhum ponto adicionado ainda.</p>';
    return;
  }

  const ul = document.createElement('ul');
  savedPoints.forEach((point) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${point.name}</strong> - Votos: ${point.votes}<br>
      ${point.description}<br>
      ${point.imageUrl ? `<img src="${point.imageUrl}" width="100" /><br>` : ''}
    `;
    ul.appendChild(li);
  });

  listContainer.appendChild(ul);
}

//Função de Login local usando localStorage
function login() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  logar(email, senha)
}

//Função de Registro local usando localStorage
function registrar() {
  const nome = document.getElementById('regNome').value;
  const email = document.getElementById('regEmail').value;
  const senha = document.getElementById('regSenha').value;

  
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.find(u => u.email === email)) {
    alert("Email já registrado.");
    return;
  }
  const novoUsuario = { nome, email, senha };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuário cadastrado com sucesso!");
  logar(email, senha)
  
}

//Logout e atualização do estado do botão "Sair"
function logout() {
  localStorage.removeItem('usuarioLogado');
  alert("Você saiu da conta.");
  atualizarEstadoLogin();
  showSection('login');
}



//Exibe ou esconde botão "Sair" conforme status de login
function atualizarEstadoLogin() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const logoutBtn = document.getElementById('logoutBtn');

  if (usuario) {
    logoutBtn.style.display = 'inline-block';
  } else {
    logoutBtn.style.display = 'none';
  }
}

function logar (email, senha){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const user = usuarios.find(u => u.email === email && u.senha === senha);
  if (user) {
    alert("Logado com sucesso: " + user.nome);
    localStorage.setItem('usuarioLogado', JSON.stringify(user));
    atualizarEstadoLogin();
    showSection('ocorrencias');
  } else {
    alert("Usuário ou senha inválidos.");
  }

}

//Ações iniciais ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  loadPointsList();
  atualizarEstadoLogin();
});