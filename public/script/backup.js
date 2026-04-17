// variaveis
let campos = [
  document.getElementById("nome"),
  document.getElementById("sobrenome"),
  document.getElementById("telefone"),
  document.getElementById("operadora"),
];
let nomeCampo = ["Nome", "Sobrenome", "Telefone", "Operadora"];
let msg = document.getElementById("msg");
let tabelaAgenda = document.querySelector("#tabelaAgenda tbody");

let contatos = []; // Inicializa como array vazio

// =======================Eventos==============================
// Evento Cadastrar
let btnCadastrar = document.getElementById("btnCadastrar");
btnCadastrar.addEventListener("click", cadastrar);

// Evento Limpar
let btnLimpar = document.getElementById("btnLimpar");
btnLimpar.addEventListener("click", limpavalidacao);

// =======================Formulario==============================
// Valida um campo
function validaCampo(campo, nomeCampo) {
  if (campo.value === "") {
    campo.classList.add("border", "border-danger", "border-2");

    mostrarMsg(false, "O campo " + nomeCampo + " é obrigatório<br>");

    return false;
  }
  return true;
}

// validar Formulario
function validarForm(e) {
  e.preventDefault();

  let isValid = true;

  for (let i = 0; i < campos.length; i++) {
    if (!validaCampo(campos[i], nomeCampo[i])) {
      isValid = false;
    }
  }

  if (isValid) {
    mostrarMsg(true, "Cadastro realizado com sucesso!");
  }

  return isValid;
}

// Limpa a validação
function limpavalidacao() {
  for (let i = 0; i < campos.length; i++) {
    campos[i].classList.remove("border", "border-danger", "border-2");
  }
}

// Limpa Form
function limpaForm() {
  campos.forEach((campo) => (campo.value = ""));
}

// =======================Cadastro==============================

// cadastrar
function cadastrar(e) {
  e.preventDefault();

  limpavalidacao();
  ocultarMsg();

  let isValid = validarForm(e);

  let contato = {
    nome: campos[0].value,
    sobrenome: campos[1].value,
    telefone: campos[2].value,
    operadora: {
      id: campos[3].value,
      nome: campos[3].options[campos[3].selectedIndex].innerText,
    },
  };

  if (isValid) {
    repositorio("POST", "http://localhost:3000/contatos", contato);
    limpaForm();
  }
}

// Excluir
function excluir(id) {
  if (confirm("Tem certeza que deseja excluir?")) {
    repositorio("DELETE", `http://localhost:3000/contatos/${id}`);
  }
}

// Editar
function editar(id) {
  let contatoAtual = contatos.find((c) => c.id == id);

  if (!contatoAtual) return;

  let novoNome = prompt("Digite o novo nome para:", contatoAtual.nome);

  if (novoNome !== null && novoNome !== "") {
    let contatoEditado = {
      ...contatoAtual,
      nome: novoNome,
    };

    repositorio("PUT", `http://localhost:3000/contatos/${id}`, contatoEditado);
  }
}

// ajax
function repositorio(method, url, dados) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200 || this.status == 201) {
        // Se for GET, atualizamos a lista global e desenhamos a tabela
        if (method === "GET") {
          contatos = JSON.parse(this.responseText);
          montarTabela();
        } else {
          // Se for POST, PUT ou DELETE, pedimos um novo GET para atualizar tudo
          repositorio("GET", "http://localhost:3000/contatos");
        }
      }
    }
  };
  xhttp.open(method, url, true);
  if (dados) {
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(dados));
  } else {
    xhttp.send();
  }
}

// montarTabela
function montarTabela() {
  tabelaAgenda.innerHTML = "";
  contatos.forEach((c) => {
    let nomeOperadora = c.operadora?.nome || "Sem operadora";

    tabelaAgenda.innerHTML += `
      <tr>
        <td>${c.nome || ""}</td>
        <td>${c.sobrenome || ""}</td>
        <td>${c.telefone || ""}</td>
        <td>${nomeOperadora}</td>
        <td><button class="btn btn-danger btn-sm" onclick="excluir('${c.id}')">Excluir</button></td>
        <td><button class="btn btn-warning btn-sm" onclick="editar('${c.id}')">Editar</button></td>
      </tr>`;
  });
}

// chama o ajax
repositorio("GET", "http://localhost:3000/contatos");

// =======================mensagem==============================

// Mostrar mensagem
function mostrarMsg(isSuccess, mensagem) {
  if (isSuccess) {
    msg.classList.remove("alert-danger");
    msg.classList.add("alert-success");
  } else {
    msg.classList.remove("alert-success");
    msg.classList.add("alert-danger");
  }

  msg.classList.add("show");
  msg.classList.remove("hide");

  msg.innerHTML += mensagem;
}

// Ocutar mensagem
function ocultarMsg() {
  msg.classList.remove("show");
  msg.classList.add("hide");

  msg.innerHTML = "";
}
