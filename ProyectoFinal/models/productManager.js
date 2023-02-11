const fs = require('fs');
const directory = './files/';
const fileDataFormatDefault = 'utf-8'
const fileName = 'productos.txt'

class ProductManager {
    constructor() { }
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
                return { status: "Error", message: "No se puede dar de alta un producto con un código repetido" }
            } else {
                productos.push({ ...obj, id: newId })
                try {
                    fs.writeFileSync(directory + "/productos.txt", JSON.stringify(productos), fileDataFormatDefault)
                    return { status: 'Success', message: `Se ha agregado el producto: ${obj.title} registrado con el ID:${newId}`, id: newId }
                } catch (error) {
                    throw new Error(`Error al guardar: ${error}`)
                }
            }
        } else {
            return ("Sin datos")
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
        let products = fs.readFileSync(directory + fileName, fileDataFormatDefault)
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
                        return ({ status: 'Success', message: `Elemento eliminado` })
                    } else {
                        return ({ status: 'Error', message: "Item Inexistente" })
                    }
                } else {
                    return ({ status: "error", message: "Lista Vacia" })

                }
            } catch (error) {
                return ({ message: "Error al eliminar el producto", data: error })
                // return []
            }
        } else {
            return ({ status: "Error", message: "El valor ingresado es inválido" })
        }
    }

    deleteAllProducts() {
        try {
            fs.writeFileSync(directory + fileName, '[]')
            return console.log("todos los productos fueron eliminados")
        } catch (error) {
            console.log("Error al eliminar los productos", error)
        }
    }

    updateProduct(obj, idx) {
        const productos = this.getAllProducts()
        let index = this.getProductUbication(productos, Number(idx))

        if (index > 0) {
            for (let clave in obj) {
                productos[index][clave] = obj[clave]
            }
            try {
                fs.writeFileSync(directory + fileName, JSON.stringify(productos), fileDataFormatDefault)
                return { status: "Success", message: `Se ha agractualizado el producto con ID:${productos[index].id}` }
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`)
            }
        } else {
            return { status: "Error", message: `Producto: ${idx} no encontrado` }
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

// let a = new ProductManager()
// console.log(a.getAllProducts())

module.exports = { ProductManager }