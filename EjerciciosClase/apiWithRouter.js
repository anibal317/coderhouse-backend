const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const lstPersonas = []
const lstMascotas = []

const personas = Router()
const mascotas = Router()

const validarDatosMascota = (req, res, next) => {
    const data = req.body

    if (Object.entries(data).length === 0 || Object.entries(data).length != 3) {
        console.log("Error en el envio de los datos de la mascota")
        res.status(400).json({
            message: "Sin datos enviados, envie información en formato correcto",
            example: `{"nombre":"Firulais","raza":"caniche","edad":5}`
        })
    } else {
        next()
    }
}
const validarDatosPersona = (req, res, next) => {
    const data = req.body

    if (Object.entries(data).length === 0 || Object.entries(data).length != 2) {
        console.log("Error en el envio de los datos de la personas")
        res.status(400).json({
            message: "Sin datos enviados, envie información en formato correcto",
            example: `{"nombre":"Juan","edad":15}`
        })
    } else {
        next()
    }

}

personas.get("/", (req, res) => {
    res.send(lstPersonas)
})

personas.post("/", [validarDatosPersona], (req, res) => {

    lstPersonas.push(data)
    res.status(200).json({
        message: "Persona guardada con exito",

    });
})

mascotas.get("/", (req, res) => {
    res.send(lstMascotas)

})
mascotas.post("/", [validarDatosMascota], (req, res) => {
    mascotas.push(data)
    res.status(200).json({
        message: "Mascota guardada con exito",

    });

})


app.use('/personas', personas)
app.use('/mascotas', mascotas)

app.listen(8080, () => {
    console.log('Servidor corriendo')
})