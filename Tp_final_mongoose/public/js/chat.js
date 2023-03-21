const socket = io.connect()

const inputMessage = document.getElementById('textAreaTexto')
const senderMessage = document.getElementById('senderMessage')
const author = document.getElementById('userName')
// const textMessage = document.getElementById('textAreaTexto')
const textMessageContainer = document.getElementById('message-container')





// crea un nuevo objeto `Date`
var today = new Date();
 
// obtener la fecha y la hora
var now = today.toLocaleString();

inputMessage?.addEventListener('input', () => {
    socket.emit("mensajeEnviado", inputMessage.value)
})


socket.on('newChatMessage', (mensajes) => {
    renderMessage(mensajes)
})
// socket.on('mensajesRecibidos', (mensajes) => {
//     senderMessage.innerText = mensajes
// })

function addMessage(e){
    const message = {
        id:null,
        user: author.value,
        message: inputMessage.value,
        time:now
    }
    socket.emit('new-message', message)
    // author.value=""
    textMessage.value = ""
    return false
}


function renderMessage(allMessages) {
    const contentHTML = allMessages.map((elem,index)=>{
        return (`<div style="color: white;">
                    <p style="color:pink";><strong>${elem.user}</strong> 
                    <span style="color:red;">[</span><span style="color:yellow;">${elem.time}</span><span style="color:red;">]</span>: 
                    <em><span style="color:white;">${elem.message}</span></em></p>
                 </div>`)
    }).join(" ");
    // console.log("Sale?",contentHTML)
    textMessageContainer.innerHTML = contentHTML
}