function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  if (!email || !senha){
    alert ("Sem Email ou Senha")
  }else{
  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  })
  .then(async (res) => {
  if (!res.ok) {  // se deu erro (400, 404, 500...)
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro desconhecido");
  }
  return res.json();
})
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("nome", response.nome);
      localStorage.setItem("email", response.email);
      window.location.href = "index.html";
      atualizarEstadoLogin()
    })
    .catch((error) => {
      console.log(error);
      alert("Erro: "+error.message);
    });  
}}

function registrar() {
  const nome = document.getElementById('regNome').value;
  const email = document.getElementById('regEmail').value;
  const senha = document.getElementById('regSenha').value;


  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  if (!validarEmail(email)) {
    alert("E-mail inválido");
    return;
  }

  fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  })
  .then((data) => data.json())
    .then((response) => {
      console.log(response);
       // Salva email e senha temporariamente para o login
      localStorage.setItem("tempEmail", email);
      localStorage.setItem("tempSenha", senha);
      // Redireciona para login.html
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.log(error);
      alert("Email Ja Cadastrado");
      localStorage.clear();
    });
}

//Logout e atualização do estado do botão "Sair"
function logout() {
  // Remove dados de autenticação
  localStorage.removeItem('token');
  localStorage.removeItem('nome'); 
  localStorage.removeItem('email');
  localStorage.removeItem('tempEmail'); // Remove itens temporários, se existirem
  localStorage.removeItem('tempSenha');

  // Feedback para o usuário
  alert("Você saiu da conta.");

  // Atualiza a interface
  atualizarEstadoLogin();
}

// Exibe ou esconde botão "Sair" conforme status de login
function atualizarEstadoLogin() {
  const token = localStorage.getItem('token'); // não usar JSON.parse aqui
  const nomeSalvo = localStorage.getItem('nome');

  const logoutBtn   = document.getElementById('logoutBtn');
  const loginLink   = document.getElementById('loginLink');
  const registroLink= document.getElementById('registroLink');
  const nomeUsuario = document.getElementById('nomeUsuario');
  const perfilLink = document.getElementById('perfilLink')

  // Considera autenticado se há uma string não vazia/diferente de "null"/"undefined"
  const autenticado = !!(token && token !== 'null' && token !== 'undefined' && token.trim() !== '');

  if (autenticado) {
    if (logoutBtn)    logoutBtn.style.display    = 'inline-block';
    if (loginLink)    loginLink.style.display    = 'none';
    if (registroLink) registroLink.style.display = 'none';
    if (perfilLink) perfilLink.style.display = 'inline'
    if (nomeUsuario)  nomeUsuario.textContent    = `Bem-vindo, ${nomeSalvo?.trim() || 'Usuário'}`;
  } else {
    if (logoutBtn)    logoutBtn.style.display    = 'none';
    if (perfilLink) perfilLink.style.display = 'none'
    if (loginLink)    loginLink.style.display    = 'inline';
    if (registroLink) registroLink.style.display = 'inline';
    if (nomeUsuario)  nomeUsuario.textContent    = '';
  }
}

//Ações iniciais ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  atualizarEstadoLogin();
});