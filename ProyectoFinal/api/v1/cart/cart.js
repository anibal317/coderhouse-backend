const { Router } = require('express');
const router = Router();
let cart = require('../../../files/cart.json')
require('dotenv').config()


router.get('/all', function (req, res) {
    console.log("Consultando el carrito")
    res.status(200).send(cart.user2)
})

router.post('/', async (req, res) => {
    res.send(cart.user1)
})

module.exports = router;