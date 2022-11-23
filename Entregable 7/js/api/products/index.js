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
		console.log("Consultando datos")
		res.send(await csql.selectData())

	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.get("/:id", [isNumber], async (req, res) => {
	let productId = parseInt(req.params.id)
	let resData = await csql.selectDataById(productId)
	console.table(resData.length)
	try {
		if (resData.length) {
			res.status(200).send(resData)
		} else {
			res.status(204).send()
		}
	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.post("/", async (req, res) => {
	console.log("Agregando un producto")

	try {
		let reqData = req.body
		if (Object.keys(reqData).length !== 0) {
			res.status(201).send(await csql.insertData(reqData))
		} else {
			res.status(422).send({
				message: "Payload vacio"
			})
		}
	} catch (error) {
		res.status(400).send(`Error al procesar: ${error}`)
	}
});

router.put("/:id", [], async (req, res) => {
	
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
	let productId = parseInt(req.params.id)
	console.log(`Borrando el producto => id: ${productId}`)

	try {
		res.status(400).send(csql.deleteData(13))
	} catch (error) {
		res.status(400).send(`Error al eliminar el producto ${error}`)
	}
});


module.exports = router;
