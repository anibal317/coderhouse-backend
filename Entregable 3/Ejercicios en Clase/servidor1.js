const http = require('http')

const server = http.createServer((req, res) => {
    res.end(getMensaje())
})


const connectedServer = server.listen(8080, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
});

function getMensaje() {
    const hora = new Date().getHours
    if (hora >= 6 & hora <= 12) {
        return 'Buenos días'
    } else if (hora >= 13 & hora <= 19) {
        return 'Buenos Tardes'
    } else {
        return 'Buenas noches'
    }
}