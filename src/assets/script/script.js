const inputext = document.querySelector('#inputext')
const ul = document.querySelector('ul');
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const inputeditar = document.querySelector('.edit')
const btneditar = document.querySelector('.btneditar')
const newAsk = (id, name)=>{ return { id: id, nome: name } }
let aux = 0
const bd_asks = JSON.parse(localStorage.getItem('bd_asks')) || []

//Função que cria uma LI(list item)
const criarLi = (text , key, deletBtn , editBtn)=>{
    const li = document.createElement('li')
    li.innerText = text;
    li.setAttribute('data-key', key)
    li.append(deletBtn)
    li.append(editBtn)
    return li;
}
//Função apagar tarefa.
const deleteBtn = ()=>{
        const btn = document.createElement('button');
        const bd = JSON.parse(localStorage.getItem('bd_asks'));
        btn.innerText = 'apagar';

        btn.addEventListener('click', (e)=>{

            let key = parseInt(e.target.parentElement.getAttribute('data-key'))
            let new_bd = bd.filter(el =>{ return el.id !== key});
            localStorage.setItem('bd_asks', JSON.stringify(new_bd));
            location.reload();
           
        })
    return btn;
}
//Botão Editar ou actualizar tarefa.
const editBtn = ()=>{
    const btn = document.createElement('button');
            btn.innerText = 'editar';
            btn.addEventListener('click', (e)=>{
            modal.style.display = 'flex'
            aux = parseInt(e.target.parentElement.getAttribute('data-key'))
        })
    return btn;
}
//Função Editar ou actualizar tarefa.
const btn_editar = ()=>{
    const bd = JSON.parse(localStorage.getItem('bd_asks'));
    let new_bd = bd.filter(el =>{ return el.id !== aux});
    new_bd.unshift(newAsk(aux, inputeditar.value));
    localStorage.setItem('bd_asks', JSON.stringify(new_bd));
    location.reload();
}
//Evento keypress pega o evento da tecla pressionada e adiciona a tarefa.
document.addEventListener('keypress' , (e)=>{
    if (e.key == 'Enter') {
        if (!inputext.value) return;

            let id = Math.floor(Math.random() * 1000)
            bd_asks.unshift(newAsk(id, inputext.value))
            localStorage.setItem('bd_asks', JSON.stringify(bd_asks))
            inputext.value = '';
            inputext.focus();
            location.reload();

    }
})
//Função adicionar tarefa executada no botão add.
function addItem() {
    
        if (!inputext.value) return;

            let id = Math.floor(Math.random() * 1000)
            bd_asks.unshift(newAsk(id, inputext.value))
            localStorage.setItem('bd_asks', JSON.stringify(bd_asks))
            inputext.value = '';
            inputext.focus();
            location.reload();

}
//Lendo os dados na tela.
bd_asks.forEach(element => {
    ul.append(criarLi(element.nome, element.id, deleteBtn(), editBtn()))
});

close.addEventListener('click', ()=>{
    modal.style.display = 'none'
})
