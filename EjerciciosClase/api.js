const express = require('express')

const app = express()

const frase = "Pariatur velit est duis qui aliquip dolore cillum in commodo consectetur esse excepteur ad tempor."

app.get("/", (req, res) => {
    // res.send(frase)
    res.send("Bienvenido")
})

app.get("/api/frase", (req, res) => {
    // res.send(frase)
    res.send(req.query)
})

app.get("/api/letras/:num", (req, res) => {
    let num = req.params.num
    // console.log(frase.charAt(num))
    res.send(frase[num])
})

app.get("/api/palabras/:num", (req, res) => {
    let pos = req.params.num
    res.send(frase.split(" ")[pos])
});

app.listen(8080, () => {
    console.log('Servidor corriendo')
})