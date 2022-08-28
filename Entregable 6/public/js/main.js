const socket = io.connect()

const inputMessage = document.getElementById('textAreaExample')
const senderMessage = document.getElementById('senderMessage')

inputMessage.addEventListener('input', () => {
    socket.emit("mensajeEnviado", inputMessage.value)
})


socket.on('mensajesRecibidos', (mensajes) => {
    senderMessage.innerText = mensajes
})