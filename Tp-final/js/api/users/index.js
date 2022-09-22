const app = require("express");
const router = app.Router();
const { promises: fs } = require('fs');

const {
    isNumber,
    isEmpty,
    isBodyOk,
    isPriceNumber,
    verifyProperties
} = require("../../middlewares");


router.get("/", async (req, res) => {
    console.log("Usuarios")
    // res.status(200).send(createRandomPwd())
    try {
        // console.log("Listando los usuarios, usar postman para ver los resultados")

        const allusers = await fs.readFile("./files/userList.txt", 'utf-8')
        const allUserList = JSON.parse(allusers)
        allUserList.map(el => {
            delete el.userName
            delete el.pwd
        })
        res.status(200).send(allUserList)

    } catch (error) {
        // res.render('productList', { listExists: false })
        res.status(400).send(`Error al recuperar los datos ${error}`)

        return []
    }
});

router.post("/login", async (req, res) => {
    console.log("login")
    console.log(req.body.user)
    try {
        const allusers = await fs.readFile("./files/userList.txt", 'utf-8')
        const allUserList = JSON.parse(allusers)
        console.log(allUserList)
        const user = allUserList.find(el => { el.userName === "admin" && el.pwd === "admin" })
        res.status(200).send(user)

    } catch (error) {
        // res.render('productList', { listExists: false })
        res.status(400).send(`Error al recuperar los datos ${error}`)

        return []
    }
});



router.get("/:id", [isNumber], async (req, res) => {
    // let productId = parseInt(req.params.id)
    // console.log(`Listando el producto  => id:${productId}`)
    // try {
    // 	const objetos = await fs.readFile("./files/productos.txt", 'utf-8')
    // 	let allProducts = await JSON.parse(objetos)
    // 	let oneProduct = await allProducts.find(element => element.id === productId)
    // 	if (oneProduct) {
    // 		res.status(200).send(oneProduct)
    // 	} else {
    // 		res.status(400).send("Producto no encontrado")
    // 	}
    // } catch (error) {
    // 	res.status(400).send(`Error en consultar los datos ${error}`)
    // }
});

router.post("/", [isEmpty, isBodyOk, isPriceNumber], async (req, res) => {
    // console.log("Agregando un producto")
    // let product = req.body
    // const file = req.file
    // if (!file) {
    // 	const error = new Error('Please upload a file')
    // 	error.httpStatusCode = 400
    // 	return next(error)
    // }
    // delete product.submit;
    // const productos = await fs.readFile("./files/productos.txt", 'utf-8')

    // let newId
    // if (JSON.parse(productos.length) == 0) {
    // 	newId = 1
    // } else {
    // 	const lastId = JSON.parse(productos)[JSON.parse(productos).length - 1].id
    // 	newId = lastId + 1
    // }
    // let arr = JSON.parse(productos)
    // arr.push({ ...product, id: newId, thumbnail: imgFileName.replace(" ", "-") })
    // try {
    // 	await fs.writeFile("./files/productos.txt", JSON.stringify(arr, null, 2))
    // 	// res.status(200).send(`Se ha creado el producto con id:${newId}`)
    // 	res.render('endTransaction', { dato: `Se ha creado el producto con id:${newId}` })
    // } catch (error) {
    // 	res.status(400).send(`Error al procesar: ${error}`)
    // }
});

router.put("/:id", [], async (req, res) => {
    // let productId = parseInt(req.params.id)
    // let newData = req.body
    // console.log(`Editando el producto  => id:${productId}`)
    // try {
    // 	const objetos = await fs.readFile("./files/productos.txt", 'utf-8')
    // 	let allProducts = await JSON.parse(objetos)
    // 	let oneProduct = await allProducts.find(element => element.id === productId)

    // 	Object.keys(newData).forEach((key) => {
    // 		oneProduct[key] === undefined ? null : oneProduct[key] = newData[key]
    // 	})
    // 	await fs.writeFile("./files/productos.txt", JSON.stringify(allProducts, null, 2))

    // 	res.status(200).send("sale")

    // } catch (error) {
    // 	res.status(400).send(`Error en consultar los datos ${error}`)
    // }
});

router.delete("/:id", [isNumber], async (req, res) => {
    // let productId = req.params.id
    // console.log(`Borrando el producto => id: ${productId}`)

    // try {
    // 	const objetos = await fs.readFile("./files/productos.txt", "utf-8")
    // 	let allProducts = await JSON.parse(objetos)
    // 	let index = await allProducts.findIndex(element => element.id === productId)
    // 	allProducts.splice(index, 1)
    // 	await fs.writeFile("./files/productos.txt", JSON.stringify(allProducts, null, 2))
    // 	res.status(400).send(`Elemento eliminado`)
    // } catch (error) {
    // 	res.status(400).send(`Error al eliminar el producto ${error}`)
    // }
});

module.exports = router;
