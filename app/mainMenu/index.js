   const { ipcRenderer } = require('electron')


function statusValidator(){
    let statusBox = document.querySelector('.statusBox')
    let border = document.querySelector('.border')
    if (statusBox.value == "BUG" || statusBox.value == "bug"){
        statusBox.style.backgroundColor="rgba(202, 29, 29, 0.747)"
        statusBox.style.color="#ffffff"
        statusBox.value = "BUG :("
    } else if( statusBox.value == "OK" || statusBox.value == "ok"){
        statusBox.style.backgroundColor="green"
        statusBox.style.color="#ffffff"
        statusBox.value = "OK :)"
    } else if ( statusBox.value == "ajuste"){
        statusBox.style.backgroundColor="#F76D1A"
        statusBox.style.color="#ffffff"
        statusBox.value = "AJUSTE"
    } else{
        statusBox.style.backgroundColor="#8e8e8e48"
        statusBox.style.color="#ffffff"
    }


}

// event listner
 let btnLine = document.querySelector(".addLine")
 let btnremove = document.querySelector(".removeLine")
 let btnSalvar = document.querySelector('.salvar')
 let inputCaminho = document.querySelector('.armazenamento')

 btnLine.addEventListener('click', ()=>{addLine()})
 btnremove.addEventListener('click', ()=>{removeLine()})   
btnSalvar.addEventListener('click', ()=>{printPDF()})





//função que cria linha nova
function addLine(){
    let lista = document.querySelector('.lines')
    
    let divNova = document.createElement("div")
    let inputNovo = document.createElement("input")
    let maisInputNovo = document.createElement("input")

    divNova.appendChild(inputNovo)
    divNova.appendChild(maisInputNovo)
    divNova.classList.add("line")
    maisInputNovo.classList.add('inputC')
    inputNovo.value = document.querySelectorAll('.line').length + 1

    lista.appendChild(divNova)        

                     
}

// função que remove linha
function removeLine(){

    let lista = document.querySelectorAll('.line').length

    document.querySelectorAll('.line')[lista - 1].remove()
    

}




 // função que gera o pdf
function printPDF(){
   //   correção de posicionamento do index ao iniciar a função 
    document.querySelector('.index').style.marginTop="-75px"
    document.querySelector('.index').style.marginLeft="2px"
    //oculta os botões
    btnremove.style.opacity = 0
    btnLine.style.opacity = 0
    btnSalvar.style.opacity = 0
    inputCaminho.style.opacity = 0
    
    //formulação do nome do pdf
    let task = document.querySelector('.task')
    let index = document.querySelector('.tIndex')
    let caminho = inputCaminho.value
    let arquivo = {
        name: `${task.value}-${index.value}`,
        local: `${caminho}/`
    }

    //console.log(msg)
    ipcRenderer.send('print', arquivo)
    
    //exibe os botões novamente
    let esperaPrint = setTimeout(()=>{

        btnremove.style.opacity = 1
        btnLine.style.opacity = 1
        btnSalvar.style.opacity = 1
        inputCaminho.style.opacity = 1
        clearTimeout(esperaPrint)
    }, 1200)
    
    
    
   
}