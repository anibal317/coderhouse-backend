import express from 'express';
import fs from 'fs';
import ProductManager from './models/productManager.js'
const product = new ProductManager()


const app = express();


app.get('/', (req, res, next) => {
    console.log("Entrando en la home")
    res.send(`<h1 style="color:red;">Bienvenido</h1>`)
})

app.get('/productos', async (req, res, next) => {
    console.log("entrando en productos")
    let limit = req.query.limit

    if (Object.entries(req.query).length === 0) {
        res.status(200).send({
            data: { products: await product.getAllProducts(), totalItems: await product.getAllProducts().length },
            message: "Datos recuperados"
        })
    }

    if (Number(limit)) {
        res.status(200).send({
            data: { products: await product.getAllProducts().slice(0, limit), totalItems: await product.getAllProducts().slice(0, limit).length },
            message: "Datos recuperados"
        })
    } else {
        res.status(400).send({
            message: "Valor no valido"
        })
    }

})

app.get('/productos/:pid', async (req, res, next) => {
    let pid = req.params.pid
    console.log(pid)
    if (Number(pid)) {
        let prod = await product.getProductById(Number(pid))
        console.log(prod.id)
        if (prod.id) {
            res.status(200).send({
                data: { products: prod, totalItems: prod.length },
                message: "Datos recuperados"
            })
        } else {
            res.status(200).send({
                message: "Producto no encontrado"
            })
        }
    } else {
        pid = 0
        res.status(400).send({
            message: "Valor no valido"
        })
    }
})


app.listen(8080, () => {
    console.log("Welcome Server running under http://localhost:8080")
})