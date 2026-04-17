📇 Agenda de Contatos - CRUD com JavaScript & JSON Server
Este é um projeto de uma Agenda de Contatos funcional, desenvolvido para praticar manipulação de DOM, requisições assíncronas (AJAX/XMLHttpRequest) e integração com uma API REST simulada.
🚀 Funcionalidades
Cadastrar: Adiciona novos contatos com nome, sobrenome, telefone e operadora.
Listar: Exibe os contatos em uma tabela dinâmica consumindo dados da API.
Editar: Permite alterar os dados de um contato existente através de um modal do Bootstrap.
Excluir: Remove contatos com confirmação via modal.
Validação: Sistema de validação simples para campos obrigatórios.
🛠️ Tecnologias Utilizadas
HTML5 & CSS3
Bootstrap 5: Para estilização e componentes (modais).
JavaScript (Vanilla): Lógica principal e manipulação do DOM.
JSON Server: Para simular uma API REST com persistência de dados em um arquivo .json. 
📦 Como rodar o projeto
1. Pré-requisitos
Você precisará ter o Node.js instalado em sua máquina. 
2. Clonar o repositório 
bash
git clone https://github.com
cd sua-agenda-contatos
Use o código com cuidado.
3. Iniciar a API (JSON Server)
A aplicação depende de um backend falso para funcionar. Abra o terminal na pasta raiz do projeto e execute o seguinte comando: 
bash
npx json-server --watch src/db.json
Use o código com cuidado.
Nota: Certifique-se de que o caminho src/db.json existe ou ajuste para onde o seu arquivo db.json estiver localizado. Por padrão, a API rodará em http://localhost:3000.
4. Abrir a aplicação
Agora basta abrir o arquivo index.html no seu navegador de preferência.
📂 Estrutura de Arquivos
index.html: Estrutura da página e tabela.
main.js: Toda a lógica de eventos, validação e chamadas AJAX.
src/db.json: Banco de dados simulado onde os contatos ficam salvos.
