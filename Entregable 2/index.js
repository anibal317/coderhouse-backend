const { promises: fs } = require('fs');
const directory = './files';
const fileDataFormatDefault = 'utf-8'


class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    async save(obj) {
        const productos = await this.getAll(directory)
        let newId
        if (productos.length == 0) {
            newId = 1
        } else {
            const lastId = parseInt(productos[productos.length - 1].id)
            newId = lastId + 1
        }
        productos.push({ ...obj, id: newId })

        try {
            await fs.writeFile(directory + "/productos.txt", JSON.stringify(productos, null, 2))
            return console.log(newId)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }

        // fs.promises.appendFile('./files/EscribiendoArchivo.txt', JSON.stringify(obj))
        //     .then(() => console.log(`El producto ${obj.title} se ha guardado correctamente`))
        //     .catch((err) => console.log(`Se ha generado un error al querer guardar el archio: \n${err}`))
    }

    async getById(id) {
        try {
            const objetos = await fs.readFile(directory + "/productos.txt", fileDataFormatDefault)
            let allProducts = await JSON.parse(objetos)
            let oneProduct = await allProducts.find(element => element.id === id)

            return console.log(oneProduct)

        } catch (error) {
            throw new Error(`Error al leer: ${error}`)
        }
    }

    async getAll() {
        try {
            const objetos = await fs.readFile(directory + "/productos.txt", fileDataFormatDefault)
            return console.log(JSON.parse(objetos))
        } catch (error) {
            // throw new Error(`Error al guardar: ${error}`)
            return []

        }
    }

    async deleteById(id) {
        try {
            const objetos = await fs.readFile(directory + "/productos.txt", fileDataFormatDefault)
            let allProducts = await JSON.parse(objetos)
            let index = await allProducts.findIndex(element => element.id === id)
            allProducts.splice(index, 1)
            console.log(allProducts)
            await fs.writeFile(directory + "/productos.txt", JSON.stringify(allProducts, null, 2))
            return `Elemento eliminado`
        } catch (error) {
            console.log("Error al eliminar el producto", error)
            // return []
        }

    }

    async deleteAll() {
        try {
            await fs.writeFile(directory + "/productos.txt", '')
            return console.log("Elementos eliminados")
        } catch (error) {
            console.log("Error al eliminar los elementos", error)
        }
    }

}

class Producto {
    constructor(productTitle, productPrice, productThumbail) {
        this.title = productTitle,
            this.price = productPrice,
            this.thumbnail = (productThumbail || './src/img/no-image-placeholder.jpg')
    }
}

let newProduct = new Producto('título 1', 100)
let newFile = new Contenedor('productos.txt')

// newFile.save(newProduct)
// newFile.getById(6)
newFile.getAll()
// newFile.deleteById(3)
// newFile.deleteAll()