let table = document.querySelector("table")

let nome= document.getElementById('nome')
let cor = document.getElementById('cor')
let sabor= document.getElementById('sabor')
let origem = document.getElementById('origem')
let spanId = document.querySelector('span')

let btnSalvar = document.getElementById("btnSalvar")
let btnAlterar = document.getElementById("btnAlterar")




mostrarFrutas(buscarFrutas())


function guardarFrutas(){
    if(buscarFrutas() == null){
    localStorage.setItem("frutas", JSON.stringify( [{
                            id: Date.now(),
                            nome:nome.value, 
                            cor:cor.value, 
                            sabor:sabor.value, 
                            origem:origem.value
                        }] ) 
                        )
                    }
    else{
        let todasFrutas = buscarFrutas()
        todasFrutas.push({
            id: Date.now(),
            nome:nome.value, 
            cor:cor.value,
            sabor:sabor.value,
            origem:origem.value
        })
        localStorage.setItem("frutas",JSON.stringify(todasFrutas))
    }
    mostrarFrutas(buscarFrutas())
}
function buscarFrutas(){
    return JSON.parse(localStorage.getItem("frutas"))
}


function mostrarFrutas(listaFrutas){
    table.innerHTML= ''
    table.innerHTML=`
    
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cor</th>
            <th>Sabor</th>
            <th>Origem</th>
            <th class="apagar">Apagar</th>

        </tr>
    `
    listaFrutas.forEach((frutaActual)=>{
        table.innerHTML+= `
            <tr onclick="selecionarFruta('${frutaActual.id}',
                                        '${frutaActual.nome}',
                                        '${frutaActual.cor}',
                                        '${frutaActual.sabor}',
                                        '${frutaActual.origem}')">
                <td>${frutaActual.id}</td>
                <td>${frutaActual.nome}</td>
                <td>${frutaActual.cor}</td>
                <td>${frutaActual.sabor}</td>
                <td>${frutaActual.origem}</td>
                <td class="btnApagar" onclick=" apagarFruta(${frutaActual.id})"> Apagar </td>

            </tr>
        `
    });

}
function apagarFruta(id){

    
    let todasFrutas = buscarFrutas()
    event.stopPropagation() // para evitar que o evento de click na linha seja acionado quando clicamos no botão apagar

    let novaLista = todasFrutas.filter((frutaActual) => (frutaActual.id != id))
    localStorage.setItem("frutas", JSON.stringify(novaLista))
    mostrarFrutas(buscarFrutas())

    // forma de limpar os inputs 
    nome.value=''
    cor.value=''
    origem.value=''
    sabor.value=''


    // para desativar o botao alterar e activar o botao salvar 

    btnAlterar.classList.add('inactivo')

   btnSalvar.classList.remove('inactivo')
   btnSalvar.classList.add('activo')


}

function selecionarFruta(idFruta, nomeFruta, corFruta, saborFruta, origemFruta){
    spanId.innerText= 'ID: '+idFruta
    nome.value=nomeFruta
    cor.value=corFruta
    sabor.value=saborFruta
    origem.value=origemFruta
    

   btnSalvar.classList.add('inactivo')

   btnAlterar.classList.remove('inactivo')
   btnAlterar.classList.add('activo')

}

function alterarFruta (){
    let todasFrutas = buscarFrutas()
    let idFruta = spanId.innerText.replace('ID: ','') //server para pegar o id da fruta que está no spanId e remover o texto 'ID: ' para ficar só o número do id

    let frutaAlvo = todasFrutas.find((frutaActual) => frutaActual.id ==idFruta)

    frutaAlvo.nome = nome.value
    frutaAlvo.cor = cor.value
    frutaAlvo.sabor = sabor.value
    frutaAlvo.origem = origem.value

    localStorage.setItem("frutas",JSON.stringify(todasFrutas))
    mostrarFrutas(buscarFrutas())
}


// botão limpar

function btnLimpar() {
    // Seleção correta e segura dos elementos do formulário
    const nome = document.getElementById("nome");
    const cor = document.getElementById("cor");
    const sabor = document.getElementById("sabor");
    const origem = document.getElementById("origem");
    //const btnAlterar = document.getElementById("btnAlterar");

    // Limpeza dos valores dos inputs (verificando se existem para evitar erros)
    if (nome) nome.value = '';
    if (cor) cor.value = '';
    if (sabor) sabor.value = '';
    if (origem) origem.value = '';
    if (spanId) spanId.innerText = '';

    // Gestão correta das classes de estado dos botões
    if (btnAlterar) {
        btnAlterar.classList.add('inactivo');
        btnAlterar.classList.remove('activo');
    }

    // Se necessário focar novamente no primeiro campo
    if (nome) nome.focus();
}



