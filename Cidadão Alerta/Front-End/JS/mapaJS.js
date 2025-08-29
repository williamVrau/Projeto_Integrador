//Inicialização de Variáveis
let mapInitialized = false;
let map;
let markers = [];
let allPoints = []; // Nova variável para armazenar todos os pontos

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
            console.log(response);
            allPoints = response.map(p => new Ponto(p)); // Armazena todos os pontos
            allPoints.forEach(ponto => addMarkerToMap(ponto)); // Adiciona todos os marcadores inicialmente
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
      <option value="">-- Selecione --</option>
      <option value="infraestrutura">Infraestrutura</option>
      <option value="cabos-rompidos">Cabos Rompidos</option>
      <option value="lixo">Lixo</option>
      <option value="melhorias">Melhorias</option>
      </select>
      <br>
      <label>Imagem:<br><input type="file" id="pointImage" accept="image/*"></label><br>
      <button type="button" onclick="savePoint(${latlng.lat}, ${latlng.lng})">Salvar</button>
    </form>
    `;
    L.popup()
        .setLatLng(latlng)
        .setContent(popupContent)
        .openOn(map);
}

// Função para salvar ponto (parte truncada no original, mantida como exemplo)
function savePoint(lat, lng) {
    const token = localStorage.getItem('token');
    const name = document.getElementById('pointName').value;
    const description = document.getElementById('pointDesc').value;
    const tipoOcorrencia = document.getElementById('tipoOcorrencia').value;
    const imageFile = document.getElementById('pointImage').files[0];

    if (imageFile && imageFile.size > 2 * 1024 * 1024) {
        alert("Imagem muito grande! Máx 2MB");
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('lat', lat);
    formData.append('lng', lng);
    formData.append('tipoOcorrencia', tipoOcorrencia);
    if (imageFile) formData.append('imagem', imageFile);

    fetch('http://localhost:8080/Pontos', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            alert("Ponto salvo com sucesso!");
            recarregarMarcadores();
            loadPointsList();
        })
        .catch(error => {
            console.error(error);
            alert("Erro ao salvar ponto");
        });
}

// Adicionar marcador no mapa (parte truncada no original, assumindo que é assim)
function addMarkerToMap(ponto) {
    const color = getMarkerColor(ponto.totalVotos);
    const icon = L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const marker = L.marker([ponto.lat, ponto.lng], { icon }).addTo(map);
    marker.bindPopup(`
        <strong>${ponto.name}</strong><br>
        <p>${ponto.description}</p>
        <p>Tipo: ${ponto.tipoOcorrencia}</p>
        <p>Votos: ${ponto.totalVotos}</p>
        ${ponto.urlImagen ? `<img src="${ponto.urlImagen}" width="100" />` : ''}
        <button onclick="votarPonto(${ponto.id})">Votar</button>
    `);

    markers.push({ marker, ponto }); // Armazena o marcador e o ponto associado
}

//cor do marcador com base na quantidade de votos
function getMarkerColor(votes) {
    if (votes < 5) return 'blue';
    if (votes < 10) return 'orange';
    if (votes < 15) return 'red';
    return 'black';
}

// Função para votar em um ponto (parte truncada no original, mantida como exemplo)
function votarPonto(id) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/Voto/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (res.ok) {
                alert("Voto registrado!");
                recarregarMarcadores();
                loadPointsList();
            } else {
                throw new Error("Erro ao votar");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Você já votou nesse ponto ou erro ao votar");
        });
}

// Carrega e exibe lista de pontos salvos
function loadPointsList(tipo = "") {
    fetch('http://localhost:8080/Pontos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(response => {
            let savedPoints = (response || []).map(p => new Ponto(p));

            // Filtrar por tipo se fornecido
            if (tipo !== "") {
                savedPoints = savedPoints.filter(ponto => ponto.tipoOcorrencia === tipo);
            }

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

// Função para recarregar marcadores (mantida, mas agora usada no filtro)
function recarregarMarcadores(tipo = "") {
    markers.forEach(obj => map.removeLayer(obj.marker));
    markers = [];

    fetch('http://localhost:8080/Pontos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(response => {
            let pontos = response.map(p => new Ponto(p));

            // Filtrar por tipo se fornecido
            if (tipo !== "") {
                pontos = pontos.filter(ponto => ponto.tipoOcorrencia === tipo);
            }

            pontos.forEach(ponto => addMarkerToMap(ponto));
        })
        .catch(err => console.error("Erro ao recarregar marcadores:", err));
}

// Nova função para filtragem
function filtrarPorTipo(tipo) {
    recarregarMarcadores(tipo); // Filtra o mapa
    loadPointsList(tipo); // Filtra a lista de pontos
}

// Evento de carregamento da página
window.addEventListener('DOMContentLoaded', () => {
    loadPointsList();
});