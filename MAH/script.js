// JavaScript para interagir com o backend
// Inclui login, registro, geolocalização, validação, etc.

function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Requisição de login
function login() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  fetch("http://localhost:8080/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
  .then(res => res.json())
  .then(data => alert("Logado com sucesso: " + data.nome))
  .catch(() => alert("Erro no login"));
}

 // Requisição de registro
function registrar() {
  const nome = document.getElementById('regNome').value;
  const email = document.getElementById('regEmail').value;
  const cpf = document.getElementById('regCpf').value;
  const senha = document.getElementById('regSenha').value;

  fetch("http://localhost:8080/api/usuarios/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, cpf, senha })
  })
  .then(res => res.json())
  .then(data => alert("Usuário cadastrado com sucesso!"))
  .then(data => console.log ("Logado como:" , data))
  .catch(() => alert("Erro ao registrar"));
}

// Chamada à API Eva
async function verificarEmail() {
  const email = document.getElementById('regEmail').value;
  const res = await fetch('https://api.eva.pingutil.com/email?email=${email}');
  const data = await res.json();
  document.getElementById('emailStatus').textContent = data.data.deliverable ? 'Email válido ✅' : 'Email inválido ❌';
}

// Chamada à BrasilAPI
async function verificarCPF() {
  const cpf = document.getElementById('regCpf').value.replace(/\D/g, '');
  const res = await fetch('https://brasilapi.com.br/api/cpf/v1/${cpf}');
  const status = document.getElementById('cpfStatus');
  status.textContent = res.status === 200 ? 'CPF válido ✅' : 'CPF inválido ❌';
}

// Obter coordenadas e mostrar no mapa
let map, lat, lng;
function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
    document.getElementById('local').textContent = 'Lat:${lat},Lng:${lng}';
    if (!map) {
      map = L.map('map').setView([lat, lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }
    L.marker([lat, lng]).addTo(map);
  });
}

// Enviar ocorrência ao backend com foto e localização
function registrarOcorrencia() {
  const descricao = document.getElementById('descOcorrencia').value;
  const foto = document.getElementById('fotoOcorrencia').files[0];
  const formData = new FormData();
  formData.append("descricao", descricao);
  formData.append("latitude", lat);
  formData.append("longitude", lng);
  formData.append("usuarioId", 1); // Simulado
  formData.append("foto", foto);

  fetch("http://localhost:8080/api/ocorrencias/registrar", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => alert("Ocorrência registrada com sucesso!"))
  .catch(() => alert("Erro ao registrar ocorrência"));
}