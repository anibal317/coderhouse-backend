const { Router } = require("express");
const userModel = require("../../../models/user")
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
        const { name, lastName, email, userName, password } = req.body
        const resultado = await userModel.create({
            nombre, apellido, email, password
        })
        res.status(200).json({
            status: "Success",
            info: resultado
        })
    } catch (error) {
        res.status(404).json({
            message: "Error en la creación de usuaiors",
            error: error.message
        })
    }
})


module.exports = router;