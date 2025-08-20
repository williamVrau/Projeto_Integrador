async function carregarPerfil() {
      try {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        // Chame sua API
        const response = await fetch('http://localhost:8080/Usuario/'+email, {
            method: 'GET',
            headers: { Authorization: "Bearer " + token, 
                'Content-Type': 'application/json', }})
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
            <td>${ponto.description}</td>
            <td>${ponto.tipoOcorrencia}</td>
            <td>${new Date(ponto.dataCriacao).toLocaleDateString()}</td>
            <td>${ponto.situacao}</td>
            <td>
              ${ponto.urlImagen 
                ? `<img src="${ponto.urlImagen}" alt="Imagem Ponto"/>`
                : "Sem imagem"}
            </td>
            <td>
              <button class="btn btn-execucao" onclick="atualizarSituacao(${ponto.id}, 'Em execução')">Em execução</button>
              <button class="btn btn-pronta" onclick="atualizarSituacao(${ponto.id}, 'Pronta')">Pronta</button>
            </td>
          `;
          tabelaBody.appendChild(tr);
        });

      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    }
     async function atualizarSituacao(pontoId, novaSituacao) {
        const token = localStorage.getItem('token');
      try {
        await fetch('http://localhost:8080/Ponto/Alterar/'+pontoId, {
          method: "PUT",
          headers: { Authorization: "Bearer " + token,
            "Content-Type": "application/json" },
          body: JSON.stringify({ situacao: novaSituacao })
        });

        alert("Situação atualizada para: " + novaSituacao);
        carregarPerfil(); // recarrega os dados

      } catch (error) {
        console.error("Erro ao atualizar situação:", error);
      }
    }


    // Executa ao carregar a página
    carregarPerfil();