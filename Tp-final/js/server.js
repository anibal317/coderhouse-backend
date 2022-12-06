require('dotenv').config()

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const bodyParser = require('body-parser');

const express = require('express');
const products = require('./api/products');
const cart = require('./api/cart');
const user = require('./api/users');
const messages = require('./api/messages');

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);


app.use(express.static("public"))
app.use(express.static("src/"))
app.use(express.static("public/sections"))
app.use(express.static("public/sections/404"))
app.use(express.static('public/imgs'));
app.use(express.static('public/js'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', products);
app.use('/api/messages', messages);
app.use('/api/cart', cart);
app.use('/api/user', user);


app.get('/chat', (req, res) => {
  res.render('chat', {
      message: "Chatea con uno de nuestros operadores",
  })
})

app.get('*', function(req, res) {
    res.sendFile("404productlist.html",{ root: "public/sections/404"})
  });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado... http://localhost:${process.env.SERVER_PORT}`);
});


const connectedServer = httpServer.listen(process.env.MESSAGE_SERVER_PORT, () => {
  console.log(`Servidor HTTP con WebSocket listo... http://localhost:${process.env.MESSAGE_SERVER_PORT}`)
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