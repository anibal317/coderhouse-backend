const fs = require('fs');
const directory = './files/';
const fileDataFormatDefault = 'utf-8'
const fileName = 'users.txt'




class UserManager {
    constructor(id, name, lastName, email, password, profileImg, user) {
        this.userId = id,
            this.products = [],
            this.name = name,
            this.lastName = lastName,
            this.email = email,
            this.password = password,
            this.profileImg = profileImg,
            this.user = user
    }

    getAllUsers() {
        let users = fs.readFileSync(directory + fileName, fileDataFormatDefault)
        return JSON.parse(users)
    }

    getUserById(id) {
        if (id > 0) {
            try {
                const objetos = this.getAllUsers()
                let oneUser = objetos.find(element => element.userID === id)
                if (oneUser) {
                    return oneUser
                } else {
                    return "Cart no encontrado"
                }
            } catch (error) {
                throw new Error(`Error al leer: ${error}`)
            }
        } else {
            return "El valor ingresado es inválido"

        }
    }

    // deleteCartById(id) {
    //     if (id > 0) {
    //         try {
    //             let cart = this.getCartByID(id)
    //             let objetos = this.getAllCarts()
    //             if (objetos.length > 0) {
    //                 if (cart.id) {
    //                     objetos.splice(this.getCartUbication(objetos, id), 1)
    //                     fs.writeFileSync(directory + fileName, JSON.stringify(objetos))
    //                     return ({ status: 'Success', message: `Elemento eliminado` })
    //                 } else {
    //                     return ({ status: 'Error', message: "Item Inexistente" })
    //                 }
    //             } else {
    //                 return ({ status: "error", message: "Lista Vacia" })
    //             }
    //         } catch (error) {
    //             return ({ message: "Error al eliminar el carrito", data: error })
    //             // return []
    //         }
    //     } else {
    //         return ({ status: "Error", message: "El valor ingresado es inválido" })
    //     }
    // }

    // getCartUbication(arr, idx) {
    //     let index = arr.findIndex(element => element.id === idx)
    //     return index
    // }
}




module.exports = { UserManager }