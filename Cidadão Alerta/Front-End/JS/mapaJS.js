//Inicialização de Variáveis
let mapInitialized = false;
let map;
setTimeout(() => {
      inicializarMapa();
      loadPointsList();
      map.invalidateSize();
      mapInitialized = true;
    }, 100);
// Classe Ponto
class Ponto {
  constructor({ id, name, description, lat, lng, tipoOcorrencia, dataCriacao, situacao, urlImagen, usuario, votos }) {
    this.id = id ?? null;
    this.name = name ?? "Sem nome";
    this.description = description ?? "";
    this.lat = lat ?? 0;
    this.lng = lng ?? 0;
    this.tipoOcorrencia = tipoOcorrencia ?? "Não informado";
    this.dataCriacao = dataCriacao ?? new Date().toISOString().split("T")[0];
    this.situacao = situacao ?? "Aberta";
    this.urlImagen = urlImagen ?? null;
    this.usuario = usuario ?? null;
    this.votos = votos ?? [];
  }
  // Exemplo: quantidade de votos
  get totalVotos() {
    return this.votos.length;
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
  fetch('http://localhost:8080/Pontos', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then((data) => data.json())
    .then((response) => {
      console.log(response)
      const pontos = response.map(p => new Ponto(p));
      pontos.forEach(ponto => addMarkerToMap(ponto))
    })
    .catch((error) => {
      console.log(error);
      alert("Algo deu Errado");
    });  
}
//Clique no Mapa para adicionar ocorrência 
function onMapClick(e) {
  const token = localStorage.getItem('token');
  const autenticado = !!(token && token !== 'null' && token !== 'undefined' && token.trim() !== '');
  if (!autenticado) {
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
          savePoint(name, description, latlng, tipoOcorrencia);
        };
        reader.readAsDataURL(imageFile);
      } else {
        savePoint(name, description, latlng, tipoOcorrencia);
      }
    });
  }, 100);
}
//Salvar novo ponto
function savePoint(name, description, latlng, tipoOcorrencia) {
  const nomeCriador = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  fetch('http://localhost:8080/Ponto/criarponto', {
    method: 'POST',
    headers: { Authorization: "Bearer " + token, 
      'Content-Type': 'application/json', },
    body: JSON.stringify({ name,
    description,
    lat: latlng.lat,
    lng: latlng.lng,  
    tipoOcorrencia,
    situacao:'aberta',
    criador: nomeCriador }),
  })
   .then((data) => data.json())
  .then((response) => {
      addMarkerToMap(response);

      // 👇 Assim que criar o ponto, já vota nele 1 vez
      votarAPI(response.id);

      loadPointsList();
      map.closePopup();
  })
  .catch((error) => {
    console.log(error);
    alert("Erro ao criar ponto");
  });
}
function addMarkerToMap(ponto) {
  const icon = createColoredIcon(getMarkerColor(ponto.totalVotos));
  const marker = L.marker([ponto.lat, ponto.lng], { icon }).addTo(map);
  const popupContent = `
    <strong>${ponto.name}</strong><br>
    <span>${ponto.dataCriacao}</span><br>
    ${ponto.description}<br>
    ${ponto.urlImagen ? `<img src="${ponto.urlImagen}" width="100" /><br>` : ""}
    <strong>Votos:</strong> ${ponto.totalVotos}<br>
    <strong>${ponto.tipoOcorrencia}</strong><br>
    <button onclick="votarAPI(${ponto.id})">👍 Votar</button>
  `;
  marker.bindPopup(popupContent);
}
// Função de voto
function votarAPI(pontoId) {
  const token = localStorage.getItem('token');
  const nomeCriador = localStorage.getItem('email');
  fetch(`http://localhost:8080/Voto/${pontoId}`, {
    method: 'POST',
    headers: { 
      Authorization: "Bearer " + token, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    nomeUsuario: nomeCriador }),
  })
  .then(res => res.json())
  .then(response => {
    console.log("Voto registrado");

    // Atualiza a lista de pontos
    loadPointsList();
  })
  .catch(err => console.error("Erro ao votar:", err));
}
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
// Carrega e exibe lista de pontos salvos no localStorage
function loadPointsList() {
  fetch('http://localhost:8080/Pontos', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(response => {
      // Transforma cada retorno da API em objeto Ponto
      const savedPoints = (response || []).map(p => new Ponto(p));

      // Ordenar por votos (desc) e depois por nome (asc)
      savedPoints.sort((a, b) => {
        if (b.totalVotos === a.totalVotos) {
          return a.name.localeCompare(b.name);
        }
        return b.totalVotos - a.totalVotos;
      });

      // Montar lista no HTML
      const listContainer = document.getElementById('pointsList');
      listContainer.innerHTML = '';

      if (savedPoints.length === 0) {
        listContainer.innerHTML = '<p>Nenhum ponto adicionado ainda.</p>';
        return;
      }

      const ul = document.createElement('ul');
      savedPoints.forEach(ponto => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${ponto.name}</strong><br>
          Data da Criação: ${ponto.dataCriacao}<br>
          <strong>Votos:</strong> ${ponto.totalVotos}<br>
          ${ponto.description || ''}<br>
          ${ponto.urlImagen ? `<img src="${ponto.urlImagen}" width="100" /><br>` : ''}
        `;
        ul.appendChild(li);
      });

      listContainer.appendChild(ul);
    })
    .catch((error) => {
      console.error(error);
      alert("Algo deu errado ao carregar os pontos");
    });
}
window.addEventListener('DOMContentLoaded', () => {
  loadPointsList();
});