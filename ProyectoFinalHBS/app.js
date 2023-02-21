require('dotenv').config()
const express = require('express');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io')

const path = require('path');




//API endpoints
const products = require(`./api/${process.env.API_VERSION}/products/products.js`)
const cart = require(`./api/${process.env.API_VERSION}/cart/cart.js`)
const home = require(`./api/${process.env.API_VERSION}/home/home.js`)
const user = require(`./api/${process.env.API_VERSION}/user/user.js`)



const app = express();

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log(`Welcome Server running under http://localhost:${process.env.SERVER_PORT}`)
})
const io = new Server(server)

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static("./src/public"))
app.use(express.static('./src/public/imgs'));
app.use(express.static('./src/public/js'));


app.engine('handlebars', engine())
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, './src/views'))
// app.set("views", "./src/views")

//Routes
app.use('/api/products', products);
app.use('/api/carts', cart);
app.use('/api/users', user);
app.use('/', home);


