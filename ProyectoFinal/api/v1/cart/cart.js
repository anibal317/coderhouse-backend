const { Router } = require('express');
const router = Router();
const { CartManager } = require('../../../models/cartManager.js')
const { UserManager } = require('../../../models/userManager.js')
const { automaticID, getDate } = require('../../../utils/util')

const carts = new CartManager()
const users = new UserManager()
require('dotenv').config()


router.get('/', function (req, res) {
    console.log("Consultando el carrito")
    res.status(200).json(carts.getAllCarts())
})

router.get('/:cid', async function (req, res) {
    let cid = req.params.cid
    console.log("Carr by ID", cid)
    if (Number(cid)) {
        let cart = await carts.getCartByID(Number(cid))
        console.log("API", cart.id)
        if (cart.id) {
            res.status(200).json({
                data: { cartInformation: cart },
                message: "Datos recuperados"
            })
        } else {
            res.status(200).json({
                message: "Producto no encontrado"
            })
        }
    } else {
        res.status(400).json({
            message: "Valor no valido"
        })
    }
})

router.delete('/:cid', async function (req, res) {
    console.log("Eliminado un carrito")
    let cid = req.params.cid
    if (Number(cid)) {
        let result = await carts.deleteCartById(Number(cid))
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

router.post('/', async (req, res) => {
    console.log("Creando un cart")
    let newCart = req.body;
    let result = carts.addCart(newCart)
    if (result.status === "Error") {
        res.status(200).json({
            message: result.message
        })
    }
    if (result.status === "Success") {
        res.status(200).json({
            message: result.message,
            data: result
        })
    }
})

module.exports = router;