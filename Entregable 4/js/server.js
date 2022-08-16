const express = require('express');
const { appendFile } = require('fs');
const app = express();


const products = require('./api/products');


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', products);
app.use("/", (req, res) => {
    res.send(`
        <h1 style="color:red; text:center">Bienvenido!!!</h1>
        <div>
            Rutas disponibles:
            <ul>
                <li>
                    /api/products --> Para obtener el listado de los productos de nuestra tienda
                </li>
            </ul>
        </div>
    `)
})

app.listen(3000, () => {
    console.log('Servidor iniciado... http://localhost:3000');
});




