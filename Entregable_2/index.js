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

            if (this.codeExist(obj.code)) {
                return "No se puede dar de alta un producto con un código repetido"
            } else {
                productos.push({ ...obj, id: newId })


                try {
                    fs.writeFileSync(directory + "/productos.txt", JSON.stringify(productos), fileDataFormatDefault)
                    return console.log(`Se ha agregado el producto: ${obj.title} registrado con el ID:${newId}`)
                } catch (error) {
                    throw new Error(`Error al guardar: ${error}`)
                }
            }
        } else {
            console.log("Sin datos")
        }
    }

    getProductById(id) {
        if (id > 0) {
            try {
                const objetos = this.getAllProducts()
                let oneProduct = objetos.find(element => element.id === id)
                if (oneProduct) {
                    return oneProduct
                } else {
                    return "Producto no encontrado"
                }
            } catch (error) {
                throw new Error(`Error al leer: ${error}`)
            }
        } else {
            return "El valor ingresado es inválido"

        }
    }

    getAllProducts() {
        let products = fs.readFileSync(directory + "/productos.txt", fileDataFormatDefault)
        return JSON.parse(products)
    }

    deleteProductById(id) {
        if (id > 0) {
            try {
                let prod = this.getProductById(id)
                let objetos = this.getAllProducts()
                if (objetos.length > 0) {
                    if (prod.id) {
                        objetos.splice(this.getProductUbication(objetos, id), 1)
                        fs.writeFileSync(directory + "/productos.txt", JSON.stringify(objetos))
                        return `Elemento eliminado`
                    } else {
                        return "Item Inexistente"
                    }
                } else {
                    return "Lista Vacia"

                }
            } catch (error) {
                console.log("Error al eliminar el producto", error)
                // return []
            }
        } else {
            return "El valor ingresado es inválido"
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

    getProductUbication(arr, idx) {
        let index = arr.findIndex(element => element.id === idx)
        return index
    }

    codeExist(code) {
        let allProducts = this.getAllProducts()
        let res = allProducts.find(product => product.code === code)
        if (res) {
            return true
        } else {
            return false
        }
        // return res
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

let product1 = new Product("Producto Prueba", "Este es un producto de prueba", 200, "Sin Imagen", "abc123", 25)
let productMng = new ProductManager("productos.txt")


// console.log(productMng.addProduct(product1))
// productMng.getAllProducts()
// console.log(productMng.getProductById(5))
// productMng.updateProduct({title:"New title",description:"Description using update function"},3)
console.log(productMng.deleteProductById(3))
// productMng.getAllProducts()
// productMng.deleteAllProducts()
// console.log(productMng.codeExist("abc125"))
// productMng.codeExist("abc124")