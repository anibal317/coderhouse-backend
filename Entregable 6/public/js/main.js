const socket = io.connect()

const inputMessage = document.getElementById('textAreaTexto')
const senderMessage = document.getElementById('senderMessage')
const author = document.getElementById('userName')
const textMessage = document.getElementById('textAreaTexto')
const textMessageContainer = document.getElementById('message-container')


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
        author: author.value,
        text: textMessage.value
    }
    socket.emit('new-message', message)
    console.log(message)
    // author.value=""
    textMessage.value = ""
    return false
}

function renderMessage(allMessages) {
    const contentHTML = allMessages.map((elem,index)=>{
        return (`<div>
                    <strong>${elem.author}</strong>: ${elem.text}<em></em>
                 </div>`)
    }).join(" ");
    // console.log("Sale?",contentHTML)
    textMessageContainer.innerHTML = contentHTML
}