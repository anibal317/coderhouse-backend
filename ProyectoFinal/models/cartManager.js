const fs = require('fs');
const directory = './files/';
const fileDataFormatDefault = 'utf-8'
const fileName = 'cart.txt'




class CartManager {
    constructor(id, cartInfo, userInfo) {
        this.id = id,
            this.cartInfo = cartInfo,
            this.userInfo = userInfo
    }
    addCart(obj) {
        if (obj) {
            const carts = this.getAllCarts()
            let newId

            if (carts.length == 0) {
                newId = 1
            } else {
                const lastId = parseInt(carts[carts.length - 1].id)
                newId = lastId + 1
            }

            carts.push({ ...obj, id: newId })
            try {
                fs.writeFileSync(directory + fileName, JSON.stringify(carts), fileDataFormatDefault)
                return { status: 'Success', message: `Se ha agregado el carrito registrado con el ID:${newId}`, id: newId }
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`)
            }

        } else {
            return ("Sin datos")
        }
    }

    getAllCarts() {
        let products = fs.readFileSync(directory + fileName, fileDataFormatDefault)
        return JSON.parse(products)
    }

    getCartById(id) {
        if (id > 0) {
            try {
                const objetos = this.getAllCarts()
                let oneCart = objetos.find(element => element.id === id)
                if (oneCart) {
                    return {status:"Success", data:oneCart,message:"Cart encontrado"}
                } else {
                    return {status:"Error", message:"Cart no encontrado"}
                }
            } catch (error) {
                throw new Error(`Error al leer: ${error}`)
            }
        } else {
            return {status:"Error", message:"Valor ingresado no valido"}

        }
    }

    deleteCartById(id) {
        if (id > 0) {
            try {
                let cart = this.getCartByID(id)
                let objetos = this.getAllCarts()
                if (objetos.length > 0) {
                    if (cart.id) {
                        objetos.splice(this.getCartUbication(objetos, id), 1)
                        fs.writeFileSync(directory + fileName, JSON.stringify(objetos))
                        return ({ status: 'Success', message: `Elemento eliminado` })
                    } else {
                        return ({ status: 'Error', message: "Item Inexistente" })
                    }
                } else {
                    return ({ status: "error", message: "Lista Vacia" })

                }
            } catch (error) {
                return ({ message: "Error al eliminar el carrito", data: error })
                // return []
            }
        } else {
            return ({ status: "Error", message: "El valor ingresado es inválido" })
        }
    }

    getCartUbication(arr, idx) {
        let index = arr.findIndex(element => element.id === idx)
        return index
    }

    getCartsByUserId(uid){
        let products = fs.readFileSync(directory + fileName, fileDataFormatDefault)
        let carByUser = products.find(el =>el.userID == uid)
        return JSON.parse(carByUser)
    }
}




module.exports = { CartManager }