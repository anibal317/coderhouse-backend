const express = require('express');
require('dotenv').config()


//API endpoints
const products = require(`./api/${process.env.API_VERSION}/products/products.js`)
const cart = require(`./api/${process.env.API_VERSION}/cart/cart.js`)
const home = require(`./api/${process.env.API_VERSION}/home/home.js`)
const user = require(`./api/${process.env.API_VERSION}/user/user.js`)



const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


//Routes
app.use('/api/products', products);
app.use('/api/carts', cart);
app.use('/api/users', user);
app.use('/', home);







app.listen(process.env.SERVER_PORT, () => {
    console.log(`Welcome Server running under http://localhost:${process.env.SERVER_PORT}`)
})