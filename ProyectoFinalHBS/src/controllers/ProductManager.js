import fs from "fs";
//const ruta = "./archivoTesteo.txt";




export class Producto {
    constructor(title, description, price, thumbnail, code, stock, status, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.category = category;
    }


}


export class ProductManager {
    constructor(path) {
        this.path = path;

    }
    checkArchivo = () => {
        return fs.promise.existsSync(this.path)
    }
    newArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }



    addProduct = async (newProduct) => {

        let campos = 8;
        let i = 0;
        for (const campo in newProduct) {
            i++
        }


        if (i == campos) {
            if ((newProduct.title != undefined) && (newProduct.description != undefined) && (newProduct.price != undefined) && (newProduct.thumbnail != undefined) && (newProduct.code != undefined) && (newProduct.stock != undefined) && (newProduct.status === true) && (newProduct.category != undefined)) {

                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let products = JSON.parse(contenido);
                const tituloAuxiliar = products.find(product => product.code == newProduct.code);

                if (tituloAuxiliar) {

                    console.log(`El producto "${tituloAuxiliar.title}" ya está en la lista`);
                }
                else {
                    let contenido = await fs.promises.readFile(this.path, "utf-8");
                    let auxiliar = JSON.parse(contenido);

                    if (auxiliar.length > 0) {
                        const idAleatorio = auxiliar[auxiliar.length - 1].id + 1;
                        auxiliar.push({ ...newProduct, id: idAleatorio });
                        await fs.promises.writeFile(this.path, JSON.stringify(auxiliar));

                    }
                    else {
                        const idAleatorio = 1;
                        auxiliar.push({ ...newProduct, id: idAleatorio });
                        await fs.promises.writeFile(this.path, JSON.stringify(auxiliar));

                    }
                }
            } else {
                console.log("No pueden faltar campos")
            }
        } else {
            console.log("Se deben completar los 8 campos");
            res.send(undefined);

        }

    }

    getProducts = async () => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let auxiliar = JSON.parse(contenido)
        let newObj = []
        for(const el in  auxiliar) {
            if(auxiliar[el].thumbnail==="Sin imagen"){
                auxiliar[el].thumbnail=false
            }
           newObj.push(auxiliar[el])
        }
        return newObj;
    }


    getProductById = async (id) => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let auxiliar = JSON.parse(contenido)
        if (auxiliar.some(product => product.id === id)) {
            let pos = auxiliar.findIndex(product => product.id === id)
            return auxiliar[pos];
        } else {
            return console.log("Producto no identificado.")
        }
    }

    updateProduct = async ({ title, description, price, thumbnail, code, stock, status, category, id }) => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let auxiliar = JSON.parse(contenido)
        const tituloAuxiliar = auxiliar.find(product => product.id === id);
        if (auxiliar.some(product => product.id === id)) {
            let pos = auxiliar.findIndex(product => product.id === id)
            if (title != undefined) {
                if (title.length > 0) {
                    auxiliar[pos].title = title;
                }
            }
            if (description != undefined) {
                if (description.length > 0) {
                    auxiliar[pos].description = description;
                }
            }
            if (price != undefined) {
                if (price.length > 0) {
                    auxiliar[pos].price = parseInt(price);
                }
            }
            if (thumbnail != undefined) {
                if (thumbnail.length > 0) {
                    auxiliar[pos].thumbnail = thumbnail;
                }
            }
            if (auxiliar.some(prod => prod.code == code)) {
                return "Code repetido"
            } else if (code != undefined) {
                if (code.length > 0) {
                    auxiliar[pos].code = code;
                }
            }
            if (stock != undefined) {
                if (stock.length > 0) {
                    auxiliar[pos].stock = parseInt(stock);
                }
            }
            if (status != undefined) {
                if (status == false) {
                    auxiliar[pos].status = false;
                } else {
                    auxiliar[pos].status = true;
                }
            }
            if (category != undefined) {
                if (category.length > 0) {
                    auxiliar[pos].category = category;
                }
            }
            if (id != undefined) {
                if (id.length > 0) {
                    auxiliar[pos].id = parseInt(id);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(auxiliar))
            console.log(`El producto "${tituloAuxiliar.title}" fue actualizado.`);
        } else {
            console.log("No hay productos para actualizar.")
        }

    }

    deleteProductById = async (id) => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let auxiliar = JSON.parse(contenido)
        if (auxiliar.some(product => product.id === id)) {
            const arrayNuevo = auxiliar.filter(product => product.id != id);
            const tituloAuxiliar = auxiliar.find(product => product.id === id);
            await fs.promises.writeFile(this.path, JSON.stringify(arrayNuevo))
            console.log(`El producto "${tituloAuxiliar.title}" fue eliminado.`);

        } else {
            console.error("No se encontró el producto.");
            res.send(undefined);
        }
    }

}















