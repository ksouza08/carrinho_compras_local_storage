var baseItens = []

var carrinho = []

objItem = {
    
    id: '',
    segmento: '',
    nome: '',
    preco: 0,
    estoque: 0

}

 const itemCarrinho = {
    idProduto: -1,
    qtd: 0
}

function equalizarLocalStorage(){

    baseItens = carregarLista('baseItens') 

    if(baseItens == null){
        baseItens =[{id:1,segmento:'mercado',nome:'Arroz',preco:6.6,estoque:56},
                    {id:2,segmento:'mercado',nome:'Feijão',preco:3.84,estoque:27},
                    {id:3,segmento:'mercado',nome:'Macarrão',preco:7.04,estoque:59},
                    {id:4,segmento:'mercado',nome:'Batata',preco:6.1,estoque:48},
                    {id:5,segmento:'mercado',nome:'Banana',preco:2.32,estoque:14},
                    {id:6,segmento:'mercado',nome:'Abacaxi',preco:7.43,estoque:31},
                    {id:7, segmento:'mercado',nome:'Leite Integral',preco:4.39,estoque:60},
                    {id:8,segmento:'mercado',nome:'Leite Desnatado',preco:8.5,estoque:12},
                    {id:9,segmento:'mercado',nome:'Farinha de Trigo',preco:4.96,estoque:49},
                    {id:10,segmento:'mercado',nome:'Óleo',preco:9.09,estoque:18},
                    {id:11,segmento:'higiene',nome:'Algodão',preco:2.3,estoque:57},
                    {id:12,segmento:'higiene',nome:'Condicionador',preco:8.86,estoque:43},
                    {id:13,segmento:'higiene',nome:'Cotonete',preco:4.42,estoque:5},
                    {id:14,segmento:'higiene',nome:'Escova de dentes',preco:10.01,estoque:59},
                    {id:15,segmento:'higiene',nome:'Hidratantes',preco:6.38,estoque:3},
                    {id:16,segmento:'higiene',nome:'Lâmina de barbear',preco:3.8,estoque:45},
                    {id:17,segmento:'higiene',nome:'Papel higiênico',preco:9.85,estoque:24},
                    {id:18,segmento:'higiene',nome:'Pasta de dente',preco:6.21,estoque:18},
                    {id:19,segmento:'higiene',nome:'Sabonetes',preco:8.85,estoque:7},
                    {id:20,segmento:'higiene',nome:'Shampoo',preco:4.36,estoque:52},
                    {id:21,segmento:'limpeza',nome:'Água sanitária',preco:9.96,estoque:38},
                    {id:22,segmento:'limpeza',nome:'Alvejante',preco:4.1,estoque:1},
                    {id:23,segmento:'limpeza',nome:'Amaciante',preco:5.64,estoque:34},
                    {id:24,segmento:'limpeza',nome:'Desinfetante',preco:11.18,estoque:40},
                    {id:25,segmento:'limpeza',nome:'Detergente',preco:3.21,estoque:16},
                    {id:26,segmento:'limpeza',nome:'Escovinhas',preco:2.6,estoque:46},
                    {id:27,segmento:'limpeza',nome:'Esponja de aço',preco:10.69,estoque:53},
                    {id:28,segmento:'limpeza',nome:'Luvas de borracha',preco:4.98,estoque:40},
                    {id:29,segmento:'limpeza',nome:'Pá',preco:9.11,estoque:10},
                    {id:30,segmento:'limpeza',nome:'Pano de chão',preco:9.33,estoque:35}]

        enviarStorage(baseItens,'baseItens')
    }

    carrinho = carregarLista('carrinho')

    if(carrinho == null) {
        carrinho = []
        enviarStorage(carrinho,'carrinho')
        
    }


}

function carregarLista(storage) {
    if (localStorage.getItem(storage) != null) {
        return JSON.parse(localStorage.getItem(storage))
    }
    return null
}

function enviarStorage(lista,storage) {
    localStorage.setItem(storage, JSON.stringify(lista))    
}


function updateBaseStorage(){
  enviarStorage(baseItens,'baseItens')
}

function getBaseItens(){
    baseItens = carregarLista('baseItens')
    return baseItens
}

function getCarrinho(){
    carrinho = carregarLista('carrinho')
    return carrinho
}

function updateCarrinhoStorage(){
    enviarStorage(carrinho,'carrinho')
}

function getPosicaoItem(idProduto){
    let posicao = baseItens.findIndex((e) => {
        return e.id == idProduto
    })

    return posicao
}



function addCarrinho(idProduto,qtd){
    
    let itemC = carrinho.filter(e => {
        return e.idProduto == idProduto
    })
    
    if(saidaEstoque(idProduto, qtd)){
        if(itemC.length == 0){
            let tmp = {idProduto, qtd}      
            carrinho.push(tmp)
        }else(
            itemC[0].qtd += qtd
        )
        updateCarrinhoStorage()
    }
    else{
        alert('Item fora de estoque')
    }
    
}


function removerItemCarrinho(idProduto){
    let posicao = carrinho.findIndex((e) => {
        return e.idProduto == idProduto
    })

    entradaEstoque(idProduto,carrinho[posicao].qtd)

    carrinho.splice(posicao,1)
    updateCarrinhoStorage()

}

function diminuirQtdCarrinho(idProduto,qtd){
    let posicao = carrinho.findIndex((e) => {
        return e.idProduto == idProduto
    })

    if(carrinho[posicao].qtd == 1){
        removerItemCarrinho(idProduto)
    }else{       
        if(entradaEstoque(idProduto, qtd)){
            carrinho[posicao].qtd -= qtd
            updateCarrinhoStorage()
        }
    }
}

function saidaEstoque(idProduto, qtdSaida){ 

    let posicao = baseItens.findIndex((e) => {
        return e.id == idProduto
    })

    if(posicao > -1 && baseItens[posicao].estoque >= qtdSaida){
        baseItens[posicao].estoque-=qtdSaida
        updateBaseStorage()
        return true
    }else{
        return false
    }

}

function entradaEstoque(idProduto, qtdEntrada){ 

    let posicao = baseItens.findIndex((e) => {
        return e.id == idProduto
    })

    if(posicao > -1){
        baseItens[posicao].estoque+=qtdEntrada
        updateBaseStorage()
        return true
    }else{
        return false
    }

}












function aniversariantes() {
    carregarListaPessoas()

    let ani = pessoas.filter((item) => {
        let d = new Date(getJsDateStringFormat(item.dtNascimento))
        let h = new Date()

        return d.getMonth() == h.getMonth()
    })


    let div = document.getElementById('aniversarios')
    let css = div.getAttribute('class')

    div.getElementsByTagName('tbody')[0].replaceChildren()
    css = css.replace(' visually-hidden ', '')
    if (ani.length == 0) {
        css += " visually-hidden "
        div.setAttribute('class', css)

    }
    else {

        div.setAttribute('class', css)

        ani.forEach((item) => {

            let d = new Date(getJsDateStringFormat(item.dtNascimento))
            let h = new Date()

            let table = document.getElementById('aniversarios').getElementsByTagName('tbody')[0]
            let tag = document.createElement('tr')
            let txt = ` <td>${item.nome}</td>
                                <td>${item.dtNascimento}<td>`
            tag.innerHTML = txt

            if (d.getDate() > h.getDate()) {
                tag.setAttribute('class', 'table-primary')
            } else if (d.getDate() < h.getDate()) {
                tag.setAttribute('class', 'table-danger')
            } else {
                tag.setAttribute('class', 'table-success')
            }

            table.append(tag)
        })

    }
}

function flushForm() {
    let btn = document.getElementById('btnAdd')
    btn.setAttribute('onclick', `addPessoa(listar)`)
    btn.innerHTML = 'Adicionar'

    document.getElementById('c_nome').value = ''
    document.getElementById('c_dtNascimento').value = ''
    document.getElementById('c_email').value = ''
    document.getElementById('c_telefone').value = ''
    document.getElementById('c_id').value = ''

}



function fillForm(obj) {
    let valores = Object.entries(obj)
    valores.map(([key, val] = entry) => {
        let element = document.getElementById(`c_${key}`)
        if (element != null) {
            element.value = val
        } else
            console.log(key)
    })
}

function fillObject(obj) {
    let campos = Object.entries(obj)
    let valores = campos.map(([key, val]) => {
        let element = document.getElementById(`c_${key}`)
        if (element != null) {
            val = element.value
        } else
            console.log(key)

        return [key, val]
    })

    return Object.fromEntries(valores)
}

function addPessoa(callback) {
    objPessoa = fillObject(objPessoa)
    addItemStorage(objPessoa)
    callback()
    flushForm()
}

function alterar(id, callback) {
    fillForm(pessoas[id])
    document.getElementById('c_id').value = id
    let btn = document.getElementById('btnAdd')
    btn.setAttribute('onclick', `gravar(${id},listar)`)
    btn.innerHTML = 'Gravar'

    callback()
}

function gravar(id, callback) {
    objPessoa = fillObject(objPessoa)
    pessoas[id] = objPessoa
    enviarStorage()
    callback()
    flushForm()
}

function remover(id, callback) {
    console.log(id)
    pessoas.splice(id, 1)
    enviarStorage()
    callback()
}


function listar() {
    carregarListaPessoas()

    let tabela = ''
    for (let i = 0; i < pessoas.length; i++) {
        tabela += ` <tr>
                                <td scope="row">${i + 1}</td>
                                <td>${pessoas[i].nome}</td>
                                <td>${pessoas[i].dtNascimento}</td>
                                <td>${pessoas[i].email}</td>
                                <td>${pessoas[i].telefone}</td>
                                <td><button class="btn btn-outline-primary" id="editar" onclick="alterar(${i},listar)"><i class="bi bi-pencil-square"></i></button></td>
                                <td><button class="btn btn-danger" id="remover" onclick="remover(${i},listar)"><i class="bi bi-x-circle"></i></button></td>                          
                            </tr>`
    }

    document.getElementById('tabela').getElementsByTagName('tbody')[0].innerHTML = tabela

    aniversariantes()
}

function getJsDateStringFormat(dateString) {
    //YYYY-MM-DD
    let tmp = dateString.split('-')

    return `${tmp[1]}-${tmp[2]}-${tmp[0]}`
}