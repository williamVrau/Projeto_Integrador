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
  const loginLink = document.getElementById('loginLink');
  const registroLink = document.getElementById('registroLink');
  const nomeUsuario = document.getElementById('nomeUsuario');

  if (usuario) {
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    if (loginLink) loginLink.style.display = 'none';
    if (registroLink) registroLink.style.display = 'none';
    if (nomeUsuario) nomeUsuario.textContent = `Bem-vindo, ${usuario.nome}`;
  } else {
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (loginLink) loginLink.style.display = 'inline';
    if (registroLink) registroLink.style.display = 'inline';
    if (nomeUsuario) nomeUsuario.textContent = '';
  }
}

function logar (email, senha){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const user = usuarios.find(u => u.email === email && u.senha === senha);
  if (user) {
    alert("Logado com sucesso: " + user.nome);
    localStorage.setItem('usuarioLogado', JSON.stringify(user));
    atualizarEstadoLogin();
  } else {
    alert("Usuário ou senha inválidos.");
  }

}
function showSection(id) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

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

//Ações iniciais ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  atualizarEstadoLogin();
});