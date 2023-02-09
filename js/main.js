
const form = document.getElementById("novoItem") // const que recebe os valores do id "novoItem"
const lista = document.getElementById("lista") // const que recebe os valores do id "lista"
const itens = JSON.parse(localStorage.getItem("itens")) || [] // cria um array vazio caso n haja dados no localstorage

itens.forEach(elemento => { // forEach para exibir os elementos criados na tela
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {  //adiciona ação ao envento click do botão submit
    evento.preventDefault() // método para evitar comportamento padrão do navegador ao enviar form para si msm



    const nome = evento.target.elements['nome'] // const para definir o dado nome vindo do form
    const quantidade = evento.target.elements['quantidade'] // const para definir o dado qtd vindo do form

    const existe = itens.find(elemento => elemento.nome === nome.value)// const exite ou n elemento digitado

    const itemAtual = {  // const que faz um objeto com o nome e qtd e seus valores
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) { // consistencia para atualizar item existente
        itemAtual.id = existe.id

        atualizaElementos(itemAtual)

        // procura o id e atribui ele ao item atual
        itens[itens.findIndex(elemento => elemento.id === id)] = itemAtual
    }
    else {
        // pega o ultimo nº do array para criar um novo id em sequencia, fazendo um if com operadores tenarios
        // o "?" indica se tal condição for positiva, entao ele vai até o length - 1 pq o id começa no [0,1,2..]
        // e então soma 1 para definir o valor do novo id do elemento
        // o ":" caso seja negativa, atribuirá o id do elemento como 0
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        //executa a função para criar um novo html passando os dados que foram inseridos pelo form 
        criaElemento(itemAtual)

        itens.push(itemAtual) // add o item no array
    }


    // add os itens no localStorage do navegador pelo array, JSON.stringify é para converter objetos em arrays
    localStorage.setItem("itens", JSON.stringify(itens))


    nome.value = "" //limpa o campo após o evento submit
    quantidade.value = "" //limpa o campo após o evento submit
})

function criaElemento(item) { // função para criar novos elementos na tabela

    const novoItem = document.createElement('li') // const para criar um elemento 
    novoItem.classList.add("item") // atribui a qual classe o "novoItem" pertence

    const numeroItem = document.createElement('strong') // const para criar um elemento 
    numeroItem.innerHTML = item.quantidade //obtém a sintaxe HTML criando os elementos descendentes via js
    numeroItem.dataset.id = item.id // add o id 

    novoItem.appendChild(numeroItem) //método anexa um nó (elemento) como o último filho de um elemento.
    novoItem.innerHTML += item.nome // adiciona o "nome" ao novoItem

    // cria um filho para o "novoTtem", que é o botao delete, que pega o id por parametro
    novoItem.appendChild(botaoDelete(item.id))

    lista.appendChild(novoItem)
}

function atualizaElementos(item) { // função para atualizar os dados existentes
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade

}

function botaoDelete(id) { // funcao para implementar botao deletar
    const elementoBotao = document.createElement("button") // const para criar o elemento botao html via js
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function () { // add evento click do botao
        deletaElemento(this.parentNode, id) // chama funcao para deletar o elemento clicado
    })

    return elementoBotao
}

function deletaElemento(tag, id) { // funcao deletar, pega a tag e id do elemento clicado 
    tag.remove() // remove a tag do elemento 

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) // remove o id do item

    // add os itens no localStorage do navegador pelo array, JSON.stringify é para converter objetos em arrays
    localStorage.setItem("itens", JSON.stringify(itens))
}