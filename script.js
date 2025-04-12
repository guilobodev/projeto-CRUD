"use stritc";
const openModal = () => {
  document.querySelector("#modal").classList.add("active");
};
const closeModal = () => {
  document.querySelector("#modal").classList.remove("active");
  limparCampos();
};
function salvarEnter(event) {
  if (event.key == "Enter") {
    salvarCliente();
  }
}
//acessar o localStorage/Banco De Dados
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("db_cliente")) ?? []; //get  getLocalStorage fosse um array
};
const setLocalStorage = (dbCliente) => {
  localStorage.setItem("db_cliente", JSON.stringify(dbCliente)); //post
};
// CREATE - READ - UPDATE - DELETE

//Create
const createCliente = (cliente) => {
  try {
    const db_clientes = getLocalStorage();
    db_clientes.push(cliente);
    setLocalStorage(db_clientes);
  } catch (error) {
    console.log("erro ta dando errado");
  }
};
//Read
const readCliente = () => {
  const db = getLocalStorage();

  return Array.isArray(db) ? db : [];
};
//Update
const updateCliente = (index, cliente) => {
  try {
    const dadosNovos = getLocalStorage();
    dadosNovos[index] = cliente;
    setLocalStorage(dadosNovos);
  } catch (error) {
    console.log("index não existe" + error);
  }
};
//Delete
const deleteCliente = (index) => {
  const dbCliente = getLocalStorage();
  dbCliente.splice(index, 1);
  setLocalStorage(dbCliente);
};
//interação com o usuario
const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};
const limparCampos = () => {
  const campos = document.querySelectorAll(".modal-field");
  campos.forEach((campo) => {
    campo.value = "";
  });
};
const salvarCliente = () => {
  if (isValidFields()) {
    const cliente = {
      nome: document.querySelector("#nome").value,
      email: document.querySelector("#email").value,
      celular: document.querySelector("#celular").value,
      cidade: document.querySelector("#cidade").value,
    };
    const index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      createCliente(cliente);
      limparCampos();
      updateTable();
      closeModal();
    } else {
      updateCliente(index, cliente);
      updateTable();
      closeModal();
    }
  }
};
const criarLinha = (cliente, index) => {
  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.cidade}</td>
            <td>
                <button type="button" class="button green" id='editar-${index}'>editar</button>
                <button type="button" class="button red" id='excluir-${index}'>excluir</button>
            </td>`;

  document.querySelector("#tableClient>tbody").appendChild(novaLinha);
};
const limparTabela = () => {
  const linhas = document.querySelectorAll("#tableClient>tbody tr");
  linhas.forEach((linha) => {
    linha.parentNode.removeChild(linha);
  });
};
const updateTable = () => {
  const dbClient = readCliente();
  limparTabela();
  dbClient.forEach(criarLinha);
};
const fillfields = (cliente) => {
  document.querySelector("#nome").value = cliente.nome;
  document.querySelector("#email").value = cliente.email;
  document.querySelector("#celular").value = cliente.celular;
  document.querySelector("#cidade").value = cliente.cidade;
  document.getElementById("nome").dataset.index = cliente.index;
};
const editClient = (index) => {
  const cliente = readCliente()[index];
  cliente.index = index;
  fillfields(cliente);
  openModal();
};
const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");
    if (action == "editar") {
      editClient(index);
    } else {
      let cliente = readCliente()[index];
      const response = confirm(
        `Deseja realmente excluir o cliente ${cliente.nome}? `
      );
      if (response == true) {
        deleteCliente(index);
        updateTable();
        console.log(getLocalStorage);
      }
    }
  }
};
window.addEventListener("load", updateTable);
//eventos
document
  .querySelector("#cadastrarCliente")
  .addEventListener("click", openModal);
document.querySelector("#modalClose").addEventListener("click", closeModal);
document.querySelector("#salvar").addEventListener("click", salvarCliente);
document
  .querySelector("#tableClient> tbody")
  .addEventListener("click", editDelete);
document.querySelector("#modal").addEventListener("keydown", salvarEnter);
document.querySelector('#cancelar').addEventListener('click',closeModal)