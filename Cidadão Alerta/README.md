# Cidadão Alerta

## 1. Resumo Executivo

Desenvolver uma aplicação web interativa que permita aos cidadãos reportarem problemas urbanos (como buracos, lixo, iluminação, entre outros) diretamente em um mapa georreferenciado. Os usuários poderão postar fotos e descrições, e outros poderão visualizar, apoiar (confirmar) e fortalecer essas denúncias, que serão encaminhadas como alerta para órgãos públicos responsáveis, como prefeituras ou empresas concessionárias.

- **Nome do Projeto:** Cidadão Alerta  
- **Objetivo:** Desenvolver uma aplicação web interativa para que cidadãos reportem e acompanhem problemas urbanos via mapa, com envio de alertas aos órgãos responsáveis.  
- **Justificativa:** Facilitar a comunicação entre cidadãos e órgãos públicos para agilizar a identificação e resolução de problemas urbanos.

---

## 2. Objetivos do Projeto

- Permitir que cidadãos reportem problemas urbanos de forma simples e rápida;  
- Disponibilizar um mapa interativo com localização georreferenciada;  
- Possibilitar o envio de fotos e descrições detalhadas dos problemas;  
- Permitir que outros usuários visualizem, apoiem e fortaleçam as denúncias;  
- Encaminhar automaticamente alertas às prefeituras ou empresas responsáveis;  
- Aumentar a transparência e a participação da população na gestão urbana;  
- Auxiliar órgãos públicos no mapeamento, priorização e resolução de demandas.

---

## 3. Escopo do Projeto

### 3.1 Escopo Incluído
- Cadastro e autenticação de usuários;  
- Registro de ocorrências urbanas (buracos, lixo, iluminação, etc);  
- Upload de fotos e descrição detalhada;  
- Geolocalização em mapa interativo;  
- Sistema de apoio/validação por outros usuários;  
- Encaminhamento automatizado de alertas aos órgãos públicos;  
- Painel de acompanhamento para usuários;  
- Dashboard administrativo para órgãos públicos;  
- Sistema de denúncia de conteúdo inadequado.

### 3.2 Escopo Excluído
- Atendimento direto ou resolução dos problemas pelos órgãos públicos;  
- Aplicativo mobile nativo (Android/iOS);  
- Chat em tempo real entre usuários e órgãos públicos;  
- Suporte multilíngue (inicialmente apenas português);  
- Integração com sistemas internos legados dos órgãos públicos;  
- Moderação automatizada de conteúdo;  
- Funcionalidades de gamificação ou recompensas.

---

## 4. Requisitos

### 4.1 Requisitos de Negócio
- Cadastro e login de usuários com e-mail e senha;  
- Registro de ocorrência com foto, descrição e localização;  
- Exibição das ocorrências em mapa interativo;  
- Status visível das ocorrências (ex: enviada, em análise, resolvida);  
- Apoio/validação das denúncias por outros usuários;  
- Filtros por tipo, status e região;  
- Notificações automatizadas para órgãos públicos;  
- Histórico e acompanhamento das denúncias;  
- Painel administrativo para gestão das ocorrências;  
- Acesso via navegadores em dispositivos móveis e desktops;  
- Alteração de status das ocorrências por agentes autorizados.

### 4.2 Requisitos Técnicos
- **Frontend:** HTML, CSS, JavaScript, responsivo, uso do LeafletJS para mapas;  
- **Backend:** Java para autenticação, gerenciamento de denúncias, apoio e notificações;  
- **Banco de Dados:** Tabelas para usuários, denúncias, apoios e órgãos públicos, com armazenamento de localização (latitude/longitude);  
- **Outros:** Versionamento com Git, upload de imagens, testes manuais;  
- **Segurança:** Armazenamento seguro de senhas, validação de dados para evitar erros.

---

## 5. Stakeholders

| Nome             | Papel              | Responsabilidades                                         |
|------------------|--------------------|----------------------------------------------------------|
| Ivens Muller     | Sponsor            | Aprovação da estratégia e viabilidade do projeto         |
| Cassandra Corbani| PMO                | Planejar, acompanhar e garantir execução organizada       |
| Cassandra, William, Maria, Ronan, Pedro | Desenvolvedores Full Stack | Desenvolvimento, integração e testes da aplicação |

---

## 6. Cronograma Macro

| Período          | Atividades Principais                                                                 | Tecnologias / Ferramentas                |
|------------------|---------------------------------------------------------------------------------------|-----------------------------------------|
| 24/06 a 30/06    | Alinhamento do time, definição do escopo, criação do repositório, modelagem do BD    | Git, MySQL/PostgreSQL, Draw.io           |
| 01/07 a 07/07    | Backend: autenticação, início frontend login/cadastro, testes LeafletJS               | Java, HTML/CSS/JS, LeafletJS             |
| 08/07 a 14/07    | Registro de denúncias com foto, mapa interativo, criação da API                       | Java, HTML/CSS/JS, LeafletJS             |
| 15/07 a 21/07    | Integração frontend/backend, sistema de apoio/validação                              | Java, HTML/CSS/JS                        |
| 22/07 a 28/07    | Painel de acompanhamento, dashboard administrativo                                   | Java, HTML/CSS/JS                        |
| 29/07 a 04/08    | Alteração de status por agentes, sistema de denúncia de conteúdo inadequado           | Java, HTML/CSS/JS                        |
| 05/08 a 11/08    | Testes manuais e ajustes de responsividade e design                                 | Testes manuais, HTML/CSS/JS, Java        |
| 12/08 a 18/08    | Integração de notificações automáticas, filtros por tipo/status/região               | Java, HTML/CSS/JS                        |
| 19/08 a 25/08    | Finalização, testes finais, documentação técnica e manual do usuário                 | Java, HTML/CSS/JS, Markdown/Word        |
| 26/08 a 30/08    | Preparação para apresentação final, vídeo/slides, teste de deploy                   | PowerPoint, Heroku (ou similar)          |

---

## 7. Recursos Necessários

### 7.1 Humanos
- 1 PMO  
- 5 Desenvolvedores Full Stack

### 7.2 Tecnológicos
- IntelliJ, Draw.io, MySQL Workbench  
- GitHub para versionamento

---

## 8. Critérios de Sucesso

- Entrega dentro do prazo;  
- Sistema funcional e estável;  
- Interface responsiva e usável;  
- Encaminhamento automatizado de alertas aos órgãos;  
- Boa colaboração da equipe;  
- Apresentação clara e objetiva do projeto.

---

## Contato

Projeto desenvolvido por Cassandra Corbani e equipe.  
Para dúvidas ou sugestões, entre em contato: [seu-email@exemplo.com]
