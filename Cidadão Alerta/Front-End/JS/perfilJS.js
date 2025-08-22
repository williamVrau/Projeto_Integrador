let pontoSelecionadoId = null;

async function carregarPerfil() {
  try {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');  
    // Chame sua API
    const response = await fetch('http://localhost:8080/Usuario/' + email, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json',
      }
    });

    const usuario = await response.json();

    // Preenche informações do usuário
    document.getElementById("nome").innerText = "Nome: " + usuario.nome;
    document.getElementById("email").innerText = "Email: " + usuario.email;
    document.getElementById("classe").innerText = "Classe: " + usuario.classe;
    document.getElementById("qtdPontos").innerText = "Quantidade de pontos: " + usuario.pontos.length;

    // Preenche a tabela de pontos
    const tabelaBody = document.getElementById("tabelaPontos").querySelector("tbody");
    tabelaBody.innerHTML = ""; // limpa antes de preencher

    usuario.pontos.forEach(ponto => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${ponto.name}</td>
        <td>
          ${ponto.description}
          <button class="btn btn-editar" onclick="abrirPopupDescricao(${ponto.id}, '${ponto.description}')">✏️</button>
        </td>
        <td>${ponto.tipoOcorrencia}</td>
        <td>${new Date(ponto.dataCriacao).toLocaleDateString()}</td>
        <td>${ponto.situacao}</td>
        <td>
          ${ponto.urlImagen 
            ? `<img src="${ponto.urlImagen}" alt="Imagem Ponto"/>`
            : "Sem imagem"}
        </td>
        <td>
          <select id="situacao-${ponto.id}" class="form-select">
            <option value="Em execução">Em execução</option>
            <option value="Pronta">Pronta</option>
          </select>
          <button class="btn btn-atualizar" onclick="atualizarSituacao(${ponto.id})">Atualizar</button>
        </td>
      `;
      tabelaBody.appendChild(tr);
    });

  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
  }
}

async function atualizarSituacao(pontoId) {
  const token = localStorage.getItem('token');
  const select = document.getElementById(`situacao-${pontoId}`);
  const situacao = select.value;

  try {
    await fetch('http://localhost:8080/Ponto/Alterar/' + pontoId, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ situacao: situacao })
    });

    alert("Situação atualizada para: " + situacao);
    carregarPerfil(); // recarrega os dados

  } catch (error) {
    console.error("Erro ao atualizar situação:", error);
  }
}

function abrirPopupDescricao(pontoId, descricaoAtual) {
  pontoSelecionadoId = pontoId;
  document.getElementById("novaDescricao").value = descricaoAtual;
  document.getElementById("popupDescricao").style.display = "flex";
}

function fecharPopup() {
  document.getElementById("popupDescricao").style.display = "none";
  pontoSelecionadoId = null;
}

async function atualizarDescricao() {
  const token = localStorage.getItem('token');
  const novaDescricao = document.getElementById("novaDescricao").value;

  try {
    await fetch('http://localhost:8080/Ponto/AlterarDesc/' + pontoSelecionadoId, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description: novaDescricao })
    });

    alert("Descrição atualizada com sucesso!");
    fecharPopup();
    carregarPerfil(); // recarrega a tabela
  } catch (error) {
    console.error("Erro ao atualizar descrição:", error);
  }
}

// Executa ao carregar a página
carregarPerfil();