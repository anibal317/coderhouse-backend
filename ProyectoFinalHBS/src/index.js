import express from "express";
import { __dirname, __filename } from "./path.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js"
import multer from "multer";
import { engine } from 'express-handlebars';
import * as path from 'path'
import { Server } from "socket.io";
import { Socket } from "dgram";
import { ProductManager } from "./controllers/ProductManager.js";
import routerSocket from "./routes/socket.routes.js";
import { info } from "console";

const productManager =  new ProductManager('src/models/products.json');

const app = express();
const PORT = 8080;

const serv = app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
  })

const io = new Server(serv);



io.on("connection", async(socket)=>{
    console.log("Cliente conectado")
  
    socket.on("addProduct", async info =>{ 
      const newProduct = {...info, status:true };
      var mensajeAgregar = await productManager.addProduct(newProduct); 
      socket.emit("mensajeProductoAgregado",mensajeAgregar)
      console.log(mensajeAgregar)
    })
    socket.on("deleteProduct", async id=>{
      var mensajeBorrar = await productManager.deleteProductById(id)
      socket.emit("mensajeProductoEliminado",mensajeBorrar)
      console.log(mensajeBorrar) 
    })
    socket.emit("getProducts",  await productManager.getProducts()); 
  })



//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));



//Rutas 
app.use('/', express.static(__dirname + '/public')) 
app.use("/api/products", routerProduct)
app.use("/api/carts", routerCart)
app.use('/', routerSocket)



/*
//Código utilizado en anteriores desafíos.

/*app.listen(PORT, () => {
    console.log(`Server on port:${PORT}`);
}); 

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"src/public/img");        
    },
    filename: (req,file,cb)=>{
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})


//Routes
app.post("/upload",upload.single("product"),(req,res)=>{
    res.send("Imagen cargada correctamente")
})*/