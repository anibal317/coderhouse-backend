const express = require('express');
const {engine} = require('express-handlebars');
const products = require('./api/products');
const messages = require('./api/messages');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);


io.on('connection', socket=>{
    console.log("Nuevo Cliente conectado!");

    socket.on('mensajeEnviado', (mensajes)=>{
        io.sockets.emit("mensajesRecibidos", mensajes)
    })
})





app.engine('handlebars', engine())
app.set("view engine", "handlebars");
app.set("views", "./views")

app.use(express.static("public"))
app.use(express.static('public/imgs'));
app.use(express.static('public/js'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', products);
app.use('/api/messages', messages);

app.get('/', (req, res) => {
    res.render('productos', { 
        service1: "Alta de productos",
        service2: "Alta de proveedores",
        service3:"Seguimiento de pedidos"
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

const connectedServer = httpServer.listen(8080,()=>{
    console.log('Servidor HTTP con WebSocket listo')
})

connectedServer.on('err',(err)=>{console.log(err)})