"use stritc";
const openModal = () => {
  document.querySelector("#modal").classList.add("active");
};
const closeModal = () => {
  document.querySelector("#modal").classList.remove("active");
  limparCampos();
};

//acessar o localStorage/Banco De Dados
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("db_cliente")) ?? []; //get  getLocalStorage fosse um array
};
const setLocalStorage = (dbCliente) => {
  localStorage.setItem("db_cliente", JSON.stringify(dbCliente)); //post
};
// CREATE - READ - UPDATE - DELETE

//Create
function createCliente(cliente) {
  try {
    const db_clientes = getLocalStorage();
    db_clientes.push(cliente);
    setLocalStorage(db_clientes);
  } catch (error) {
    console.log("o erro foi " + error);
  }
}

//Read
const readCliente = () => { 
    return getLocalStorage()
  }

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
  dbCliente.slice(index, 1);
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
    createCliente(cliente);
    console.log("cadastrando clientes");
    limparCampos();
    updateTable();
    closeModal();
  }
};

const criarLinha = (cliente) => {
  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.cidade}</td>
            <td>
                <button type="button" class="button green">editar</button>
                <button type="button" class="button red">excluir</button>
            </td>`;


            document.querySelector('#tableClient>tbody').appendChild(novaLinha)
};

const limparTabela = () => {
    const linhas = document.querySelectorAll('#tableClient>tbody tr')
    linhas.forEach((linha) => {
        linha.parentNode.removeChild(linha)
    })
}

const updateTable = () => {
  const dbClient = readCliente();
  limparTabela(); 
  dbClient.forEach(criarLinha);
};



//eventos
document
  .querySelector("#cadastrarCliente")
  .addEventListener("click", openModal);
document.querySelector("#modalClose").addEventListener("click", closeModal);
document.querySelector("#salvar").addEventListener("click", salvarCliente);
