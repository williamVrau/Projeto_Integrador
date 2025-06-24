document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value.replace(/\D/g, "");
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const mensagem = document.getElementById("mensagem");

  // Verifica se as senhas conferem
  if (senha !== confirmarSenha) {
    alert("As senhas não conferem.");
    return;
  }

  // Verificação de e-mail
  try {
    const emailCheck = await fetch(`https://api.eva.pingutil.com/email?email=${email}`);
    const emailData = await emailCheck.json();
    if (!emailData.data.deliverable) {
      alert("Email inválido.");
      return;
    }
  } catch {
    alert("Erro ao verificar o email.");
    return;
  }

  // Verificação de CPF
  try {
    const cpfCheck = await fetch(`https://brasilapi.com.br/api/cpf/v1/${cpf}`);
    if (!cpfCheck.ok) {
      alert("CPF não encontrado ou inválido.");
      return;
    }
  } catch {
    alert("Erro ao verificar o CPF.");
    return;
  }

  // Salva o usuário no Local Storage
  const usuario = { email, cpf, senha };
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mensagem.innerText = "Cadastro efetuado com sucesso e salvo no Local Storage!";

  // Limpa o formulário
  e.target.reset();
});