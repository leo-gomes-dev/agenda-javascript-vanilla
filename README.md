# 📇 Agenda de Contatos — CRUD com JavaScript & JSON Server

Este é um projeto de uma **Agenda de Contatos funcional**, desenvolvido especificamente como material didático para praticar a manipulação de DOM, o ecossistema de requisições assíncronas (AJAX/XMLHttpRequest) e a integração prática com uma API REST simulada.

---

## 🚀 Funcionalidades do Projeto

O projeto consiste em um sistema de gerenciamento básico (CRUD) que simula o dia a dia de um desenvolvedor front-end integrando-se a um servidor:

* **Cadastrar**: Adiciona novos contatos validando campos obrigatórios (nome, sobrenome, telefone e operadora).
* **Listar**: Exibe os contatos em uma tabela dinâmica consumindo dados diretamente da API.
* **Editar**: Permite alterar os dados de um contato existente através de uma janela modal interativa.
* **Excluir**: Remove contatos do banco de dados com uma caixa de confirmação prévia.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia / Biblioteca | Função no Projeto |
| :--- | :--- |
| **HTML5 & CSS3** | Estruturação semântica e customizações visuais da página. |
| **Bootstrap 5** | Estilização responsiva e componentes injetados via JavaScript (Modais). |
| **JavaScript (Vanilla)** | Lógica core, manipulação de eventos do DOM e chamadas assíncronas (AJAX). |
| **JSON Server** | Simulação de uma API REST real com persistência em arquivo local `.json`. |

---

## 📦 Como Rodar o Projeto Passo a Passo

### 1. Pré-requisitos
Antes de começar, você precisará ter o **Node.js** (versão LTS recomendada) instalado em seu computador para gerenciar e executar a API local.

### 2. Clonar o Repositório e Navegar
Abra o terminal do seu computador e execute os comandos abaixo para obter a sua cópia do projeto:

```bash
# Clone o repositório (Substitua SEU-USUARIO pelo seu nome no GitHub)
git clone https://github.com/SEU-USUARIO/sua-agenda-contatos.git

# Acesse a pasta do projeto
cd sua-agenda-contatos
```

### 3. Iniciar a API Local (JSON Server)
A aplicação depende de um backend simulado para salvar e alterar os dados. Com o terminal aberto na raiz do projeto, execute:

```bash
npx json-server --watch src/db.json
```

> 💡 **Nota de Orientação:** Certifique-se de que a estrutura de pastas contém o arquivo `src/db.json`. Por padrão, o JSON Server iniciará um servidor local acessível em: `http://localhost:3000`. **Mantenha este terminal aberto** enquanto testa o projeto.

### 4. Executar a Aplicação
Com o servidor rodando no primeiro terminal, basta abrir o arquivo `index.html` diretamente no seu navegador de preferência ou utilizar a extensão *Live Server* do VS Code para visualizar as alterações em tempo real.

---

## 📂 Estrutura de Arquivos

```text
├── index.html          # Estrutura principal da página e viewport da tabela
├── main.js            # Lógica de eventos, validações e funções de requisição AJAX
└── src/
    └── db.json        # Arquivo de persistência (Banco de dados simulado da API)
```
