const { Router } = require('express');
const router = Router();
const { UserManager } = require('../../../models/userManager.js')
const { automaticID, getDate } = require('../../../utils/util')

const users = new UserManager()
require('dotenv').config()


router.get('/', function (req, res) {
    console.log("Consultando usuarios")
    res.status(200).json(user.getAllUsers())
})

router.get('/:pid', async function (req, res) {
    let pid = req.params.pid
    console.log("User by ID", pid)
    if (Number(pid)) {
        let user = await users.getUserById(Number(pid))
        console.log("API", user)
        if (user.userID) {
            res.status(200).json({
                data: { userInfo: user },
                message: "Datos recuperados"
            })
        } else {
            res.status(200).send({
                message: "Usuario no encontrado"
            })
        }
    } else {
        res.status(400).send({
            message: "Valor no valido"
        })
    }
})

router.delete('/:pid', async function (req, res) {
    console.log("Eliminado un carrito")
    let pid = req.params.pid
    if (Number(pid)) {
        let result = await carts.deleteCartById(Number(pid))
        if (result.status === 'Success') {
            res.status(200).send({
                data: result,
                message: res.message
            })
        } else {
            res.status(200).send({
                date: result, message: result.message
            })
        }
    } else {
        res.status(400).send({
            message: "Valor no valido"
        })
    }
})

router.post('/', async (req, res) => {
    res.send(cart.user1)
})

module.exports = router;