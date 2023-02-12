const { Router } = require('express');
const fs = require('fs');
const router = Router();
const directory = './files/';
const fileDataFormatDefault = 'utf-8'
const { CartManager } = require('../../../models/cartManager.js')
const { ProductManager } = require('../../../models/productManager.js')
const { UserManager } = require('../../../models/userManager.js')
const { automaticID, getDate } = require('../../../utils/util')

const carts = new CartManager()
const products = new ProductManager()
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

router.post('/:cid/product/:pid', async (req, res) => {
    console.log("Creando un cart")
    let { cid, pid } = req.params
    let cart = await carts.getCartByID(Number(cid))
    if (cart.status === "Success") {
        let cartLocation = carts.getCartUbication(carts.getAllCarts(), cart.data.id)
        let productInCart = cart.data.products.find(el => el.id === Number(pid))
        let product = await products.getProductById(Number(pid))
        if (product.status === "Success") {
            let productInCartId = cart.data.products.findIndex(element => element.id === Number(pid))
            if (productInCart) {
                ++productInCart.qty
                productInCart.total = productInCart.price * productInCart.qty
                cart.data.products[productInCartId] = productInCart

            } else {
                cart.data.products.push({ price: product.data.price, qty: 1, total: product.data.price, id: product.data.id })
            }
            let allCarts = carts.getAllCarts()
            allCarts[cartLocation]=cart.data
            fs.writeFileSync(directory + "cart.txt", JSON.stringify(allCarts), fileDataFormatDefault)
            res.status(200).json({ message: "Carrito actualizado" })
        }
    } else {
        res.status(404).json({ message: "Carrito no encontrado" })
    }

})

module.exports = router;