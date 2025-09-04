let pontoSelecionadoId = null;
let paginaAtual = 1;
const maxPontos = 6;
let totalPaginas = 1;
let listaPontosGlobal = [];

async function carregarPerfil() {
  try {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');  
    const response = await fetch('http://localhost:8080/Usuario/' + email, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao carregar perfil");
    }
    const usuario = await response.json();

    // Preenche informações do usuário
    document.getElementById("nome").innerText = "Nome: " + usuario.nome;
    document.getElementById("email").innerText = "Email: " + usuario.email;
    document.getElementById("classe").innerText = "Classe: " + usuario.classe;
    document.getElementById("qtdPontos").innerText = "Quantidade de pontos: " + usuario.listaPontos.length;

    // Salva lista global para paginação
    listaPontosGlobal = usuario.listaPontos;
    totalPaginas = Math.ceil(listaPontosGlobal.length / maxPontos);

    renderizarTabelaPontos();

  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
  }
}

function renderizarTabelaPontos() {
  const tabelaBody = document.getElementById("tabelaPontos").querySelector("tbody");
  tabelaBody.innerHTML = "";

  const inicio = (paginaAtual - 1) * maxPontos;
  const fim = inicio + maxPontos;
  const pontosExibidos = listaPontosGlobal.slice(inicio, fim);

  pontosExibidos.forEach(ponto => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ponto.name}</td>
      <td>
      <button class="btn btn-editar" onclick="abrirPopupDescricao(${ponto.id}, '${ponto.description}')">✏️</button>
        ${ponto.description}
        
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

  renderizarPaginacao();
}

function renderizarPaginacao() {
  let paginacaoDiv = document.getElementById("paginacaoPontos");
  if (!paginacaoDiv) {
    paginacaoDiv = document.createElement("div");
    paginacaoDiv.id = "paginacaoPontos";
    paginacaoDiv.style.display = "flex";
    paginacaoDiv.style.justifyContent = "center";
    paginacaoDiv.style.gap = "10px";
    paginacaoDiv.style.margin = "20px 0";
    document.getElementById("tabelaPontos").parentNode.appendChild(paginacaoDiv);
  }
  paginacaoDiv.innerHTML = "";

  // Botão anterior
  const btnAnterior = document.createElement("button");
  btnAnterior.textContent = "Anterior";
  btnAnterior.disabled = paginaAtual === 1;
  btnAnterior.onclick = () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderizarTabelaPontos();
    }
  };
  paginacaoDiv.appendChild(btnAnterior);

  // Números das páginas
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === paginaAtual;
    btn.onclick = () => {
      paginaAtual = i;
      renderizarTabelaPontos();
    };
    paginacaoDiv.appendChild(btn);
  }

  // Botão próximo
  const btnProximo = document.createElement("button");
  btnProximo.textContent = "Próximo";
  btnProximo.disabled = paginaAtual === totalPaginas;
  btnProximo.onclick = () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      renderizarTabelaPontos();
    }
  };
  paginacaoDiv.appendChild(btnProximo);
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