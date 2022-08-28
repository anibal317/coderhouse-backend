const express = require('express');
const {engine} = require('express-handlebars');
const products = require('./api/products');

const app = express();


app.engine('handlebars', engine())
app.set("view engine", "handlebars");
app.set("views", "./views")

app.use(express.static("public"))
app.use(express.static('public/imgs'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', products);




app.get('/', (req, res) => {
    res.render('productos', { 
        service1: "Alta de productos",
        service2: "Alta de proveedores",
        service3:"Seguimiento de pedidos"
     })
})

app.listen(3000, () => {
    console.log('Servidor iniciado... http://localhost:3000');
});
