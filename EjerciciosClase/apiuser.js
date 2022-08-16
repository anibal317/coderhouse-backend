const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const lstUsuarios = []

app.post("/usuario", (req, res) => {
    const data = req.body

    if (Object.entries(data).length === 0) {
        console.log("No hay datos")
        res.sendStatus(400)
    }
    lstUsuarios.push(data)
    res.send(lstUsuarios)
})

app.get("/usuario", (req, res) => {
    // res.send(frase)
    res.send(lstUsuarios)
})

app.get("/usuario/:id", (req, res) => {
    let num = req.params.num
    // console.log(frase.charAt(num))
    res.send("")
})

app.delete("/usuario/", (req, res) => {
    let pos = req.params.num
    res.send(frase.split(" ")[pos])
});

app.delete("/usuario/:id", (req, res) => {
    let pos = req.params.num
    res.send(frase.split(" ")[pos])
});

app.put("/usuario/:id", (req, res) => {
    let pos = req.params.num
    res.send(frase.split(" ")[pos])
});

app.listen(8080, () => {
    console.log('Servidor corriendo seguramente')
})