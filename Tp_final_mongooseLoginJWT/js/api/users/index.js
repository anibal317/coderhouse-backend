const { Router } = require("express");
const userModel = require("../../../models/user")
const { hashPassword } = require("../../../public/js/utils/encriptation")

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

router.post('/encrypt', async (req, res) => {
    let encrypt = req.body.pwd
    let encrypted = await hashPassword(encrypt)
    res.json({ pwdEncrypted: encrypted })
})


router.post("/", async (req, res) => {
    try {
        const { name, lastname, email, username, password } = req.body
        let pwd = await hashPassword(password)
        const resultado = await userModel.create({
            name, lastName: lastname, email, userName: username, password: pwd
        })
        res.status(200).json({
            status: "Success",
            info: resultado
        })
    } catch (error) {
        res.status(404).json({
            message: "Error en la creación de usuarios",
            errorMessage: error.message,
            errorDetail: error
        })
    }
})

router.post('/login', async (req, res) => {
    console.log("Login users")

    const user = await userModel.find({ email: req.body.userName })
    const userInfo = user[0]

    try {
        if (userInfo.email === req.body.userName && await hashPassword(req.body.pwd) === userInfo.password) {
            req.session.email = req.body.userName
            req.session.password = userInfo.password
            res.status(200).json({
                status: "Success",
                userData: {
                    userName: userInfo.name,
                    userLastname: userInfo.lastName,
                    userRol: userInfo.rol
                }
            }
            )
        } else {
            res.status(403).json("Usuario no valido")
        }
    } catch (error) {
        res.status(404).json({
            message: "Error en la consulta de users",
            error: error.message
        })
    }
})
router.get("/logout",async(req,res)=>{
    res.json("Loguot")
    req.session.destroy()
})

module.exports = router;