const express = require('express');
const app = express();

const products = require('./api/products');

app.use(express.static("public"))
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

app.listen(8080, () => {
    console.log('Servidor iniciado... http://localhost:8080');
});




