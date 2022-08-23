const express = require('express');
const {engine} = require('express-handlebars');

const app = express();


app.engine('handlebars', engine())
app.set("view engine", "handlebars");
app.set("views", "./views")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('datos', { nombre: 'jorge', apellido: 'sardon' })
})

app.listen(8080, () => {
    console.log('Servidor iniciado... http://localhost:8080');
});
