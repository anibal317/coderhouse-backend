require('dotenv').config()

const express = require('express');
const products = require('./api/products');
const cart = require('./api/cart');
const user = require('./api/users');

const app = express();



app.use(express.static("public"))
app.use(express.static("public/sections"))
app.use(express.static("public/sections/404"))
app.use(express.static('public/imgs'));
app.use(express.static('public/js'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/user', user);

app.get('*', function(req, res) {
    res.sendFile("404productlist.html",{ root: "public/sections/404"})
  });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado... http://localhost:${process.env.SERVER_PORT}`);
});
