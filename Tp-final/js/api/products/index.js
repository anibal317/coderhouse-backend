const app = require("express");
const router = app.Router();
const { promises: fs } = require('fs');
const { timeStamp: timeStamp,
	generateRandomCode: generateRandomCode,
	generateBigCodeNumber: generateBigCodeNumber } = require('../../../public/js/util.js');

const {
	isNumber,
	isEmpty,
	isBodyOk,
	isPriceNumber,
	verifyProperties
} = require("../../middlewares");


router.get("/", async (req, res) => {
	console.log("Listando todos los productos")
	try {
		const allProducts = await fs.readFile("./files/productos.txt", 'utf-8')
		console.log("Listando los productos, usar psotman para ver los resultados")
		// res.render('productList', { suggestedChamps: JSON.parse(allProducts), listExists: true })
		res.status(200).send(JSON.parse(allProducts))

	} catch (error) {
		// res.render('productList', { listExists: false })
		res.status(400).send(`Error al recuperar los datos ${error}`)

		return []
	}
});

router.get("/:id", [isNumber], async (req, res) => {
	let productId = parseInt(req.params.id)
	console.log(`Listando el producto  => id:${productId}`)
	try {
		const objetos = await fs.readFile("./files/productos.txt", 'utf-8')
		let allProducts = await JSON.parse(objetos)
		let oneProduct = await allProducts.find(element => element.id === productId)
		if (oneProduct) {
			res.status(200).send(oneProduct)
		} else {
			res.status(400).send("Producto no encontrado")
		}
	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.post("/", [], async (req, res) => {
	console.log("Agregando un producto")
	let product = req.body
	delete product.submit;

	let code = generateBigCodeNumber()

	let newProd = {
		...product,
		timestamp: timeStamp(),
		code,
		stock: parseInt(product.stock),
		price: parseInt(product.price)
	}


	const productos = await fs.readFile("./files/productos.txt", 'utf-8')

	let newId
	if (JSON.parse(productos.length) == 0) {
		newId = 1
	} else {
		const lastId = JSON.parse(productos)[JSON.parse(productos).length - 1].id
		newId = lastId + 1
	}
	let arr = JSON.parse(productos)
	console.log(arr)
	arr.push({ ...newProd, id: newId })

	try {
		await fs.writeFile("./files/productos.txt", JSON.stringify(arr, null, 2))
		res.status(200).send({ dato: `Se ha creado el producto con id:${newId}` })
	} catch (error) {
		res.status(400).send(`Error al procesar: ${error}`)
	}
});

router.put("/:id", [], async (req, res) => {
	let productId = parseInt(req.params.id)
	let newData = req.body
	console.log(`Editando el producto  => id:${productId}`)
	try {
		const objetos = await fs.readFile("./files/cartProducts.txt", 'utf-8')
		let allProducts = await JSON.parse(objetos)
		let oneProduct = await allProducts.find(element => element.id === productId)

		Object.keys(newData).forEach((key) => {
			oneProduct[key] === undefined ? null : oneProduct[key] = newData[key]
		})
		await fs.writeFile("./files/cartProducts.txt", JSON.stringify(allProducts, null, 2))

		res.status(200).send("Producto actualizado")

	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.delete("/:id", [isNumber], async (req, res) => {
	let productId = req.params.id
	console.log(`Borrando el producto => id: ${productId}`)

	try {
		const objetos = await fs.readFile("./files/productos.txt", "utf-8")
		let allProducts = await JSON.parse(objetos)
		let index = await allProducts.findIndex(element => element.id === productId)
		allProducts.splice(index, 1)
		await fs.writeFile("./files/productos.txt", JSON.stringify(allProducts, null, 2))
		res.status(400).send(`Elemento eliminado`)
	} catch (error) {
		res.status(400).send(`Error al eliminar el producto ${error}`)
	}
});

module.exports = router;
