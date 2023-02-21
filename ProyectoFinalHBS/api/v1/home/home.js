const express = require('express');
const router = express.Router();

const { ProductManager } = require('../../../models/productManager.js')
const product = new ProductManager()



router.get('/', (req, res) => {
    console.log("Entrando en la home")
    // res.send(`<h1 style="color:red;">Bienvenido</h1>`)
    res.render('home', {
        title:"Home",
        message: "<h2 ><strong>Bienvenido a nuestra tienda.<br> Use la barra de navegación para acceder a las opciones</strong></h2>"
    })
})


module.exports = router;