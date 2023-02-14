const { Router } = require('express');
const router = Router();
const { ProductManager } = require('../../../models/productManager.js')
const product = new ProductManager()

const { itemsInArray } = require('../../../utils/util')
require('dotenv').config()


router.get('/', async (req, res, next) => {
    console.log("Listando todos los productos")
    let limit = req.query.limit
    if (limit) {
        if (Number(limit)) {
            res.status(200).json({
                data: { products: await product.getAllProducts().slice(0, limit), totalItems: await product.getAllProducts().slice(0, limit).length },
                message: "Datos recuperados"
            })
        } else {
            res.status(400).json({
                message: "Valor no valido"
            })
        }
    } else {
        if (Object.entries(req.query).length === 0) {
            let prods = await product.getAllProducts()
            prods.forEach(product => { product.categoryName = JSON.parse(process.env.ALLOWED_CATEGORIES)[product.category] })
            res.status(200).json({
                data: { products: prods, totalItems: await product.getAllProducts().length },
                message: "Datos recuperados"
            })
        }
    }
})

router.get('/:pid', async (req, res, next) => {
    let pid = req.params.pid
    console.log("Productos by ID")
    if (Number(pid)) {
        let prod = await product.getProductById(Number(pid))
        prod.categoryName = JSON.parse(process.env.ALLOWED_CATEGORIES)[prod.category]
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
        res.status(400).send({
            message: "Valor no valido"
        })
    }
})

router.post('/', (req, res) => {
    console.log("Creando un producto")
    if (itemsInArray(JSON.parse(process.env.REQUIRED_FIELDS), Object.keys(req.body))) {
        let newProd = req.body;
        newProd.status = true
        let result = product.addProduct(newProd)
        if (result.status === "Error") {
            res.status(200).send({
                message: result.message
            })
        }
        if (result.status === "Success") {
            res.status(200).send({
                message: result.message,
                data: result
            })
        }
    } else {
        let a = String(JSON.parse(process.env.REQUIRED_FIELDS)).replace(/,/gi, "\n")
        res.status(200).send(`Estos campos son requeridos:\n${a}`)
    }
})

router.delete('/:pid', async (req, res) => {
    console.log("Eliminado un producto")
    let pid = req.params.pid
    if (Number(pid)) {
        let result = await product.deleteProductById(Number(pid))
        if (result.status === 'Success') {
            res.status(200).json({
                data: result,
                message: res.message
            })
        } else {
            res.status(200).json({
                date: result, message: result.message
            })
        }
    } else {
        res.status(400).json({
            message: "Valor no valido"
        })
    }
})

router.put('/:pid', async (req, res) => {
    console.log("Editando un producto")
    let newProd = {}
    let updateError = []
    let pid = req.params.pid
    if (Number(pid)) {
        Object.keys(req.body).forEach(el => {
            if (JSON.parse(process.env.ALLOWED_FIELDS).includes(el)) {
                newProd[el] = req.body[el]
            } else {
                updateError.push(el)
            }
        })
        if (Object.keys(newProd).length > 0) {
            let result = product.updateProduct(newProd, Number(pid))
            if (result.status == "Success") {
                res.status(200).json({
                    message: Object.keys(updateError).length > 0 ? {
                        message: "La actualización del producto se concreto con errores",
                        data: {
                            payloadOK: newProd,
                            paylodFaild: {
                                payloadWithError: updateError,
                                AllowedFileds: JSON.parse(process.env.ALLOWED_FIELDS)
                            }
                        }
                    }
                        :
                        { message: "Proceso concretado con exito" }
                })
            } else {
                res.status(404).json({
                    data: result
                })
            }
        }
    } else {
        res.status(400).json({ message: "Valor no valido" })
    }
})

module.exports = router;