const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs')
const path = require('path')

// inicia e cria janela

function createWindow(){
    const win = new BrowserWindow(
        {
        backgroundColor: "#333333",
        width:750,
        maxWidth:750,
        height:800,
        title:"PDFct",
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }})

        win.loadFile(__dirname + "/app/mainMenu/mainMenu.html")
        //win.webContents.openDevTools()

}

app.whenReady().then(createWindow)




//encerra o aplicativo
app.on('window-all-closed', ()=>{
    // console de encerramento 
    console.log('Encerrando')
  
    app.quit()
})




// impressora PDF

var options = {
    marginsType: 1,
    pageSize: 'A4',
    printBackground: true,
    printSelectionOnly: false,
    landscape: false,
   scaleFactor: 100
}



function print (name, pdfLocal){
    let winPdf = BrowserWindow.getFocusedWindow()
    let pdfNome = pdfLocal + name + ".pdf"

    

    winPdf.webContents.printToPDF(options).then((data)=>{
        fs.writeFile(pdfNome, data, (err)=>{ if (err) throw err})
    })
    
}



ipcMain.on('print', (event, arquivo)=>{
    //console.log('Iniciando impressão')
   print(arquivo.name, arquivo.local)
    console.log(arquivo)

})


// JS da pagina

