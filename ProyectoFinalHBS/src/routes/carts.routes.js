import { Router } from "express";
const routerCart = Router();
import {CartManager} from "../controllers/CartManager.js"
const manager = new CartManager('src/models/carts.json');


routerCart.get("/", async (req, res) => {
    try{
        res.send(await manager.getCarts())
    }catch{
        res.send("Error en el archivo")
    }

});


routerCart.get("/:cid", async (req, res) => {
    try{
        const response = await manager.getCartsProducts(parseInt(req.params.cid))
        res.send(response)
    }catch{
        res.send("Error en el archivo")
    }

});

routerCart.post("/", async (req, res) => {
    if (!manager.checkArchivo()){
        await manager.newArchivo();
    }
    try {        
        res.send(await manager.createCarritoVacio())
    }catch{
        res.send("Error en el archivo")
    }

});




routerCart.post("/:cid/product/:pid", async (req, res) => {
    try{
        let response = await manager.addProductToCart(parseInt(req.params.cid),parseInt(req.params.pid),1) 
        res.send(response)
    }catch{
        res.send("Error en alguno de los archivos")
    }

});

routerCart.delete("/:cid/product/:pid", async (req, res) => {
    try{
        let response = await manager.deleteProductById(parseInt(req.params.cid),parseInt(req.params.pid),1) 
        res.send(response)
    }catch{
        res.send("Error en alguno de los archivos")
    }

});







export default routerCart;