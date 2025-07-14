//Inicialização de Variáveis
let mapInitialized = false;
let map;
setTimeout(() => {
      inicializarMapa();
      loadPointsList();
      map.invalidateSize();
      mapInitialized = true;
    }, 100);

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
function savePoint(name, description, latlng, imageUrl, votes = 1, tipoOcorrencia) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const nomeCriador = usuarioLogado ? usuarioLogado.nome : 'Anônimo';

  const newPoint = {
    name,
    description,
    lat: latlng.lat,
    lng: latlng.lng,
    imageUrl: imageUrl || '',
    tipoOcorrencia,
    votes,
    criador: nomeCriador
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
    <span>${point.criador}</span></strong><br>
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
window.addEventListener('DOMContentLoaded', () => {
  loadPointsList();
});