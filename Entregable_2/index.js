import { Console } from 'console';
import fs from 'fs';
const directory = './files';
const fileDataFormatDefault = 'utf-8'


class ProductManager {
    constructor(fileName) {
        this.fileName = fileName
    }


    addProduct(obj) {
        if (obj) {
            const productos = this.getAllProducts()
            let newId

            if (productos.length == 0) {
                newId = 1
            } else {
                const lastId = parseInt(productos[productos.length - 1].id)
                newId = lastId + 1
            }

            productos.push({ ...obj, id: newId })


            try {
                fs.writeFileSync(directory + "/productos.txt", JSON.stringify(productos), fileDataFormatDefault)
                return console.log(`Se ha agregado el producto: ${obj.title} registrado con el ID:${newId}`)
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`)
            }
        } else {
            console.log("Sin datos")
        }
    }

    getProductById(id) {
        try {
            const objetos = this.getAllProducts()
            let oneProduct = objetos.find(element => element.id === id)
            return console.log(oneProduct)
        } catch (error) {
            throw new Error(`Error al leer: ${error}`)
        }
    }

    getAllProducts() {
        let products = fs.readFileSync(directory + "/productos.txt", fileDataFormatDefault)
        return JSON.parse(products)
    }

    getProductUbication(arr, idx) {
        let index = arr.findIndex(element => element.id === idx)
        return index
    }

    deleteProductById(id) {
        try {
            const objetos = this.getAllProducts()
            // let index = objetos.findIndex(element => element.id === id)

            objetos.splice(this.getProductUbication(objetos, id), 1)
            console.log(objetos)
            fs.writeFileSync(directory + "/productos.txt", JSON.stringify(objetos))
            return `Elemento eliminado`
        } catch (error) {
            console.log("Error al eliminar el producto", error)
            // return []
        }
    }

    deleteAllProducts() {
        try {
            fs.writeFileSync(directory + "/productos.txt", '[]')
            return console.log("todos los productos fueron eliminados")
        } catch (error) {
            console.log("Error al eliminar los productos", error)
        }
    }

    updateProduct(obj, idx) {
        const productos = this.getAllProducts()
        let index = this.getProductUbication(productos, idx)

        if (obj || index > 0) {
            for (let clave in obj) {
                productos[index][clave] = obj[clave]
            }
            try {
                fs.writeFileSync(directory + "/productos.txt", JSON.stringify(productos), fileDataFormatDefault)
                return console.log(`Se ha agractualizado el producto con ID:${productos[index].id}`)
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`)
            }
        } else {
            console.log(`Producto: ${idx} no encontrado`)
        }
    }
}

class Product {

    constructor(productTitle, productDescription, productPrice, productThumbail, productCode, productStock) {
        this.title = productTitle,
            this.description = productDescription,
            this.price = productPrice,
            this.thumbnail = productThumbail,
            this.code = productCode,
            this.stock = productStock

    }
}

let product1 = new Product("Producto Prueba", "Este es un producto de prueba",200,"Sin Imagen","abc123",25)
let productMng = new ProductManager("productos.txt")


productMng.addProduct(product1)
productMng.getAllProducts()
productMng.getProductById(3)
productMng.updateProduct({title:"New title",description:"Description using update function"},3)
// productMng.deleteProductById(3)
productMng.getAllProducts()
// productMng.deleteAllProducts()