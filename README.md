# Cidadão Alerta

## Resumo Executivo

Desenvolver uma aplicação web interativa que permita aos cidadãos reportarem problemas urbanos (como buracos, lixo, iluminação, entre outros) diretamente em um mapa georreferenciado. Os usuários poderão postar fotos e descrições, e outros poderão visualizar, apoiar (confirmar) e fortalecer essas denúncias, que serão encaminhadas como alerta para órgãos públicos responsáveis, como prefeituras ou empresas concessionárias.

- **Nome do Projeto:** Cidadão Alerta  
- **Objetivo:** Desenvolver uma aplicação web interativa para que cidadãos reportem e acompanhem problemas urbanos via mapa, com envio de alertas aos órgãos responsáveis.  
- **Justificativa:** Facilitar a comunicação entre cidadãos e órgãos públicos para agilizar a identificação e resolução de problemas urbanos.

---

## Objetivos do Projeto

- Permitir que cidadãos reportem problemas urbanos de forma simples e rápida.
- Disponibilizar um mapa interativo com localização georreferenciada.
- Possibilitar o envio de fotos e descrições detalhadas dos problemas.
- Permitir que outros usuários visualizem, apoiem e fortaleçam as denúncias.
- Encaminhar automaticamente alertas às prefeituras ou empresas responsáveis.
- Aumentar a transparência e a participação da população na gestão urbana.
- Auxiliar órgãos públicos no mapeamento, priorização e resolução de demandas.

---

## Escopo do Projeto

### Escopo Incluído

- Cadastro e autenticação de usuários.
- Registro de ocorrências urbanas.
- Upload de fotos e descrição das ocorrências.
- Geolocalização em mapa interativo.
- Sistema de apoio/validação por outros usuários.
- Encaminhamento automatizado de alertas.
- Painel de acompanhamento para usuários.
- Dashboard administrativo para órgãos públicos.

### Escopo Excluído

- Atendimento direto ou resolução dos problemas pelos órgãos públicos.
- Aplicativo mobile nativo (Android/iOS).
- Chat em tempo real com prefeituras ou concessionárias.
- Suporte multilíngue (inicialmente apenas em português).
- Integração com sistemas internos de prefeituras ou concessionárias.
- Moderação automatizada de conteúdo (imagens impróprias).
- Funcionalidades de gamificação ou recompensas para usuários.

---

## Requisitos

### Requisitos de Negócio

- O sistema deve permitir que cidadãos se cadastrem e autentiquem com e-mail e senha.
- O usuário deve conseguir registrar uma ocorrência urbana com foto, descrição e localização georreferenciada.
- A plataforma deve exibir as ocorrências em um mapa interativo.
- Cada ocorrência deve conter status (ex: enviada, recebida, em análise, resolvida).
- Os usuários devem poder apoiar denúncias feitas por outros.
- O sistema deve permitir filtragem das denúncias por tipo, status ou região.
- Órgãos públicos devem receber notificações automatizadas por tipo de problema e localidade.
- A plataforma deve permitir o acompanhamento do histórico de denúncias.
- O painel administrativo deve permitir a gestão das ocorrências pelos órgãos públicos.
- O sistema deve ser acessível via navegadores em dispositivos móveis e desktops.

### Requisitos Técnicos

#### Frontend

- Desenvolvido com HTML, CSS e JavaScript.
- Página responsiva (computadores e celulares).
- Uso de biblioteca leve para mapas (ex: Leaflet).
- Formulário para registro de problemas com upload de fotos e descrição.
- Lista e filtro de denúncias.

#### Backend

- Desenvolvido com Java.
- Funcionalidades:
  - Cadastro e login de usuários.
  - Envio e consulta de denúncias.
  - Registro de apoio às denúncias.
  - Envio de notificações por e-mail (viabilidade a ser estudada).

#### Banco de Dados

- Tabelas para usuários, denúncias, apoio às denúncias e órgãos públicos.
- Armazenamento de localização (latitude e longitude).

#### Outros

- Uso de Git para versionamento do código.
- Testes manuais para validação das funcionalidades.
- Upload de imagens armazenadas na própria aplicação.

#### Segurança

- Senhas armazenadas de forma segura.
- Validação de dados para evitar erros comuns.

---
