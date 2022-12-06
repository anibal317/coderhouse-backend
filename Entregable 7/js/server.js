const express = require('express');
const { engine } = require('express-handlebars');
const products = require('./api/products');
const messages = require('./api/messages');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const bodyParser = require('body-parser');

const { clienteSQL } = require("./clienteSQLForMessages");
const csql = new clienteSQL()

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);

const quip = require('quip'); // the culprit

app.use(quip);

app.engine('handlebars', engine())
app.set("view engine", "handlebars");
app.set("views", "./views")

app.use(express.static("public"))
app.use(express.static("src/"))
app.use(express.static('public/imgs'));
app.use(express.static('public/js'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/products', products);
app.use('/api/messages', messages);

app.get('/', (req, res) => {
    res.render('productos', {
        service1: "Alta de productos",
        service2: "Alta de proveedores",
        service3: "Seguimiento de pedidos"
    })
})

app.get('/chat', (req, res) => {
    res.render('chat', {
        message: "Chatea con uno de nuestros operadores",
    })
})

app.listen(3000, () => {
    console.log('Servidor iniciado... http://localhost:3000');
});

const connectedServer = httpServer.listen(8080, () => {
    console.log('Servidor HTTP con WebSocket listo... http://localhost:8080')
})




io.on('connection', async socket => {
    console.log("Nuevo Cliente conectado!");
    
    socket.emit('newChatMessage', await csql.selectData())
    
    socket.on('new-message', async (msgContent) => {
        // allMessages.push(msgContent)
        // console.log(await csql.selectData())
        await csql.insertData(msgContent)
        io.sockets.emit("newChatMessage",await  csql.selectData())
    })
    
    // socket.on('mensajeEnviado', (mensajes)=>{
    //     io.sockets.emit("mensajesRecibidos", mensajes)
    // })
})



connectedServer.on('err', (err) => { console.log(err) })