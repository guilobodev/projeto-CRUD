"use stritc";
const openModal = () => {
    document.querySelector("#modal").classList.add("active");
};
const closeModal = () => {
    document.querySelector("#modal").classList.remove("active");
};

const tempCliente = {
    nome: "bosta",
    email: "guilherme.brayner@outlook.com",
    celular: "79999254965",
    cidade: "nicolauCopernico",
};

//acessar o localStorage/Banco De Dados
const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("db_cliente")) ?? [];
}
const setLocalStorage = (dbCliente) => {
    localStorage.setItem("db_cliente", JSON.stringify(dbCliente));
}
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
const readCliente = (index='') =>{
    const lerDados = getLocalStorage()
     if (index == ''){
        console.log(lerDados)
        return;
    }
    console.log(lerDados[index])  
}

//Update
const updateCliente = (index, cliente) => {
    try {   const dadosNovos = getLocalStorage();
        dadosNovos[index] = cliente;
        setLocalStorage(dadosNovos);
    }catch (error) {
        console.log('index não existe' + error)

    }
 
};

//eventos
document.querySelector("#cadastrarCliente").addEventListener("click", openModal);
document.querySelector("#modalClose").addEventListener("click", closeModal);
