const { text } = require("express")

const socket = io.connect()

const inputMessage = document.getElementById('textAreaExample')
const senderMessage = document.getElementById('senderMessage')
const author = document.getElementById('userName')
const text = document.getElementById('textAreaTexto')


inputMessage.addEventListener('input', () => {
    socket.emit("mensajeEnviado", inputMessage.value)
})


socket.on('mensajesRecibidos', (mensajes) => {
    senderMessage.innerText = mensajes
})

function addMessage(e){
    const message = {
        author: author.value,
        text: text.value
    }
    socket.edit('New-message', message)
    return false
}