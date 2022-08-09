const express = require('express');
const app = express();

let visitas=0

app.get('/',(req,res,next)=>{
    res.send('<h1 style="color:green;">Bienvenido</h1>')
})

app.get('/visitas',(req,res,next)=>{
    res.send(`Cantidad de visitas: ${visitas++}`)
})

app.get('/fyh',(req,res,next)=>{
    let fyh = new Date()
    res.send(`Le fecha es ${fyh}`)
})


app.listen(8080,()=>{
    return "Welcome"
})