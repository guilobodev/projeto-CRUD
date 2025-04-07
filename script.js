'use stritc'

const openModal = ()  =>  {
    document.querySelector('#modal').classList.add('active')
}
const closeModal = () => {
    document.querySelector('#modal').classList.add('remove')

}

document.querySelector('#cadastrarCliente').addEventListener('click',openModal)
document.querySelector('#modalClose').addEventListener('click', closeModal)