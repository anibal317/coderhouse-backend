const express = require('express');
const { promises: fs } = require('fs');

const app = express();


app.get('/', (req, res, next) => {
    res.send('<h1 style="color:green;">Bienvenido</h1>')
})

app.get('/productos', async (req, res, next) => {
    try {
        const objetos = await fs.readFile("./files/productos.txt", "utf-8")
        console.log(JSON.parse(objetos))
        res.send(JSON.parse(objetos))
    } catch (error) {
        res.send(`Error al leer el archivo:\n\t ${error}`)
        throw new Error(`Error al leer el archivo:\n ${error}`)
    }
})

app.get('/productoRandom', async (req, res, next) => {
    try {
        const objetos = await fs.readFile("./files/productos.txt", "utf-8")
        let allProducts = await JSON.parse(objetos)
        let randomId = Math.floor((Math.random() * (allProducts.length - 1 + 1)) + 1)
        console.log(randomId)
        // console.log(allProducts)
        let oneProduct = await (allProducts.find(element => element.id === randomId) || null)
        if (oneProduct != null) {
            res.send(oneProduct)
        } else {
            res.send("<h2>No hay valores para mostrar</h2>")
        }
    } catch (error) {
        throw new Error(`Error al leer: ${error}`)
    }
})


app.listen(8080, () => {
    console.log("Welcome Server running under http://localhost:8080")
})