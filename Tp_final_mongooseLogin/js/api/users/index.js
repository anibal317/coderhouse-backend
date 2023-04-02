const { Router } = require("express");
const userModel = require("../../../models/user")
const { hashPassword, comparePassword } = require("../../../public/js/utils/encriptation")

const router = Router()

router.get("/", async (req, res) => {
    console.log("Consultando users")
    try {
        const users = await userModel.find()
        res.status(200).json({
            status: "Success",
            users: users
        })
    } catch (error) {
        res.status(404).json({
            message: "Error en la consulta de users",
            error: error.message
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const { name, lastname, email, username, password } = req.body
        let pwd = await hashPassword(password)
        const resultado = await userModel.create({
            name, lastName:lastname, email, userName:username, password:pwd
        })
        res.status(200).json({
            status: "Success",
            info: resultado
        })
    } catch (error) {
        res.status(404).json({
            message: "Error en la creación de usuarios",
            errorMessage: error.message,
            errorDetail:error
        })
    }
})


module.exports = router;