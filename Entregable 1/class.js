class ProductManager {
    constructor(nombre, apellido) {
        this.name = nombre,
            this.surname = apellido,
            this.products = []
    }

    /**
     *
     *@description Returns all the products
     * @return {*} 
     * @memberof ProductManager
     */
    getAllProducts() {
        return this.products
    }

    /**
     * @param {*} product
     * @memberof ProductManager
     * @description Add a product to the manager
     */
    addProduct(product) {
        if (this.products.find(element => element.code === product.code)) {
            return console.log("Producto ya en la lista")
        } else {
            this.products.push(product);
            return console.log("Producto agregado")
        }
    }

    /**
     *
     * @description Show a product wich matches with the id provided
     * @param {*} id
     * @return {*} 
     * @memberof ProductManager
     */
    getProductById(id) {
        return this.products.find(element => element.code === id) || "No hay productos"
    }
}

class Products {
    constructor(title, description, price, thumbnail, stock) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.thumbnail = thumbnail,
            this.code = "abc"+(Math.floor( Math.random()*999 ) + 100),
            this.stock = stock
    }
}

let client1 = new ProductManager("Jorge", "Sardón");
let product1 = new Products("Product #1","Producto #1",120.5,"Sin imagen",10)

client1.getAllProducts()

client1.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})
console.log(product1)
console.log(client1.getAllProducts())
