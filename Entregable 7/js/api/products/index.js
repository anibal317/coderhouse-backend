const app = require("express");
const router = app.Router();
const { promises: fs } = require('fs');
const multer = require('multer')

const { clienteSQL } = require("../../clienteSQL.js");
const { options } = require("../../options/index.js");

const csql = new clienteSQL()


const {
	isNumber,
	isEmpty,
	isBodyOk,
	isPriceNumber,
	verifyProperties
} = require("../../middlewares");
let imgFileName = ""
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/imgs')
	},
	filename: function (req, file, cb) {
		imgFileName = Date.now() + '-' + file.originalname.replace(" ", "-")
		cb(null, imgFileName.replace(" ", "-"))
	}
})
let upload = multer({ storage: storage })

router.get("/", async (req, res) => {
	try {
		const allProducts = await fs.readFile("./files/productos.txt", 'utf-8')
		console.log("Listando los productos, usar psotman para ver los resultados")
		res.render('productList', { suggestedChamps: JSON.parse(allProducts), listExists: true })
		// res.status(200).send(JSON.parse(allProducts))

	} catch (error) {
		res.render('productList', { listExists: false })
		// res.status(400).send(`Error al recuperar los datos ${error}`)

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

router.post("/", [upload.single('thumbnail'), isEmpty, isBodyOk, isPriceNumber], async (req, res) => {
	console.log("Agregando un producto")
	let product = req.body
	const file = req.file
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	delete product.submit;
	const productos = await fs.readFile("./files/productos.txt", 'utf-8')

	let newId
	if (JSON.parse(productos.length) == 0) {
		newId = 1
	} else {
		const lastId = JSON.parse(productos)[JSON.parse(productos).length - 1].id
		newId = lastId + 1
	}
	let arr = JSON.parse(productos)
	arr.push({ ...product, id: newId, thumbnail: imgFileName.replace(" ", "-") })
	try {
		await fs.writeFile("./files/productos.txt", JSON.stringify(arr, null, 2))
		// res.status(200).send(`Se ha creado el producto con id:${newId}`)
		res.render('endTransaction', { dato: `Se ha creado el producto con id:${newId}` })
	} catch (error) {
		res.status(400).send(`Error al procesar: ${error}`)
	}
});

router.put("/:id", [], async (req, res) => {
	let productId = parseInt(req.params.id)
	let newData = req.body
	console.log(`Editando el producto  => id:${productId}`)
	try {
		const objetos = await fs.readFile("./files/productos.txt", 'utf-8')
		let allProducts = await JSON.parse(objetos)
		let oneProduct = await allProducts.find(element => element.id === productId)

		Object.keys(newData).forEach((key) => {
			oneProduct[key] === undefined ? null : oneProduct[key] = newData[key]
		})
		await fs.writeFile("./files/productos.txt", JSON.stringify(allProducts, null, 2))

		res.status(200).send("sale")

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

router.post('/new/j', async function (req, res) {
	console.log("Creando base")
	res.send("Saludos")
	// csql.createTable()
	let prod = {
		id: 2,
		title: "Escuadra",
		thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
		price: 123.45,
		stock:10
	}
	// console.log(csql.insertData())
	// csql.selectData()
	console.log("Resultado", await csql.selectData().then(rows=>rows))
})
module.exports = router;
