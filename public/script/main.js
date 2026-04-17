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
// let btnLimpar = document.getElementById("btnLimpar");
// btnLimpar.addEventListener("click", limpavalidacao);

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
  repositorio("DELETE", `http://localhost:3000/contatos/${id}`);
}

// Editar
function editar(id) {
  let contatoAtual = contatos.find((c) => c.id == id);

  if (!contatoAtual) return;

  let inputNome = document.querySelector(`#input-nome-${id}`);
  let inputSobrenome = document.querySelector(`#input-sobrenome-${id}`);
  let inputTelefone = document.querySelector(`#input-telefone-${id}`);
  let inputOperadora = document.querySelector(`#input-operadora-${id}`);

  if (!inputNome || !inputSobrenome || !inputTelefone || !inputOperadora) {
    console.error("Um ou mais campos não foram encontrados!");
    return;
  }

  let contatoEditado = {
    ...contatoAtual,
    nome: inputNome.value,
    sobrenome: inputSobrenome.value,
    telefone: inputTelefone.value,
    operadora: {
      id: inputOperadora.value,
      nome: inputOperadora.options[inputOperadora.selectedIndex].innerText,
    },
  };
  console.log(contatoEditado);

  repositorio("PUT", `http://localhost:3000/contatos/${id}`, contatoEditado);
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
          <td>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDelete-${c.id}">
              Excluir
            </button>
          </td>
          <td>
           <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${c.id}" data-bs-whatever="@mdo">Editar</button>

            <div class="modal fade" id="modal-${c.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-4">
                        <label for="recipient-name" class="col-form-label">Digite os novos dados:</label>
                        <input type="text" class="form-control modal_content mb-2" id="input-nome-${c.id}" value="${c.nome}"/>
                        <input type="text" class="form-control modal_content mb-2" id="input-sobrenome-${c.id}" value="${c.sobrenome}"/>
                        <input type="text" class="form-control modal_content mb-2" id="input-telefone-${c.id}" value="${c.telefone}"/>

                        <select id="input-operadora-${c.id}" class="form-select">
                          <option value="">${nomeOperadora}</option>
                          <option value="1">Vivo</option>
                          <option value="2">Claro</option>
                          <option value="3">Tim</option>
                          <option value="4">Oi</option>
                        </select>
                      </div>
                      
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button onclick="editar('${c.id}')" type="button" class="btn btn-sm btn-primary">Salvar</button>
                  </div>
                </div>
              </div>
            </div>


            <!-- Modal -->
            <div class="modal fade" id="confirmDelete-${c.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Apagar Contato</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    Tem certeza que deseja deletar o contato <strong>${c.nome}?<strong/>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button onclick="excluir('${c.id}')" type="button"  class="btn btn-danger">Excluir</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
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
