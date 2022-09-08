require('dotenv').config()

const express = require('express');
const products = require('./api/products');
// const messages = require('./api/messages');

const app = express();

app.use(express.static("public"))
app.use(express.static('public/imgs'));
app.use(express.static('public/js'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', products);



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado... http://localhost:${process.env.SERVER_PORT}`);
});
