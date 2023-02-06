const express = require( 'express');
const router = express.Router();

const { ProductManager } = require('../../../models/productManager.js')
const product = new ProductManager()



router.get('/', (req, res, next) => {
    console.log("Entrando en la home")
    res.send(`<h1 style="color:red;">Bienvenido</h1>`)
})


module.exports = router;