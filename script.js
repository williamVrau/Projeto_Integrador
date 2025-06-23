// Inicializar o mapa em Timbó, SC
const map = L.map('map').setView([-26.8233, -49.2706], 8);

// Adiciona camada de tiles gratuita
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

map.setMinZoom(7);
map.setMaxBounds([
    [-28.5, -53],
    [-25.5, -47]
]);

// Função para determinar cor do marcador com base em votos
function getMarkerColor(votes) {
    if (votes < 5) return 'blue';
    if (votes < 10) return 'orange';
    if (votes < 15) return 'red';
    return 'black';
}

// Cria um ícone customizado com base na cor
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

// Evento de clique no mapa para adicionar pontos
map.on('click', function (e) {
    const latlng = e.latlng;

    const popupContent = `
        <form id="pointForm">
            <label>Nome:<br><input type="text" id="pointName" required></label><br>
            <label>Descrição:<br><textarea id="pointDesc" required></textarea></label><br>
            <label>Imagem (máx 2MB):<br><input type="file" id="pointImage"></label><br>
            <button type="submit">Salvar</button>
        </form>
    `;

    const popup = L.popup()
        .setLatLng(latlng)
        .setContent(popupContent)
        .openOn(map);

    // Adiciona o evento de submit para salvar o ponto
    setTimeout(() => {
        document.getElementById('pointForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('pointName').value;
            const description = document.getElementById('pointDesc').value;
            const imageFile = document.getElementById('pointImage').files[0];

            if (imageFile && imageFile.size > 2 * 1024 * 1024) {
                alert("Imagem muito grande! Máximo: 2MB.");
                return;
            }

            if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    savePoint(name, description, latlng, reader.result, 1);
                };
                reader.readAsDataURL(imageFile);
            } else {
                savePoint(name, description, latlng, '', 1);
            }
        });
    }, 100);
});

// Função para salvar ponto
function savePoint(name, description, latlng, imageUrl, votes = 1) {
    const newPoint = {
        name,
        description,
        lat: latlng.lat,
        lng: latlng.lng,
        imageUrl: imageUrl || '',
        votes
    };

    const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];
    savedPoints.push(newPoint);
    localStorage.setItem('mapPoints', JSON.stringify(savedPoints));

    addMarkerToMap(newPoint);
    loadPointsList(); // Atualiza a lista de pontos
    map.closePopup();
}

// Adiciona marcador no mapa
function addMarkerToMap(point) {
    const icon = createColoredIcon(getMarkerColor(point.votes));

    const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);

    const popupContent = `
        <strong>${point.name}</strong><br>
        ${point.description}<br>
        ${point.imageUrl ? `<img src="${point.imageUrl}" width="100" /><br>` : ''}
        <strong>Votos:</strong> <span id="votes-${point.lat}-${point.lng}">${point.votes}</span><br>
        <button onclick="votePoint(${point.lat}, ${point.lng})">👍 Votar</button>
    `;

    marker.bindPopup(popupContent);
}

// Função para votar em um ponto
function votePoint(lat, lng) {
    const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];

    const pointIndex = savedPoints.findIndex(p => p.lat === lat && p.lng === lng);
    if (pointIndex !== -1) {
        savedPoints[pointIndex].votes += 1;
        localStorage.setItem('mapPoints', JSON.stringify(savedPoints));
        location.reload(); // Recarrega para atualizar ícone e votos
    }
}

// Carrega todos os pontos salvos ao iniciar
window.addEventListener('DOMContentLoaded', () => {
    loadPointsList(); // Exibe a lista logo após a inicialização
    const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];
    savedPoints.forEach(point => {
        addMarkerToMap(point);
    });
});

// Função para carregar e exibir a lista de pontos
function loadPointsList() {
    const savedPoints = JSON.parse(localStorage.getItem('mapPoints')) || [];

    // Ordenar os pontos por votos (decrescente) e depois por nome (alfabético)
    savedPoints.sort((a, b) => {
        if (b.votes === a.votes) {
            return a.name.localeCompare(b.name); // Ordem alfabética
        }
        return b.votes - a.votes; // Ordem por votos
    });

    const listContainer = document.getElementById('pointsList');
    listContainer.innerHTML = ''; // Limpar a lista antes de exibir novamente

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

// Função para limpar todos os pontos
function clearPoints() {
    if (confirm("Tem certeza que deseja apagar todos os pontos?")) {
        localStorage.removeItem('mapPoints');
        location.reload(); // Recarrega a página para atualizar
    }
}