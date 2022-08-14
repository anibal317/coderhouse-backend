const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const router = Router()

app.get("/", (req, res) => {
    // res.send(frase)
    res.send("Bienvenido")
})

router.get("/recurso", (req, res) => {
    // res.send(frase)
    res.send("get ok")
})

router.post("/recurso", (req, res) => {
    // res.send(frase)
    res.sendStatus(204).send("post ok")
})


app.use('/api', router)

app.listen(8080, () => {
    console.log('Servidor corriendo')
})