const app = require("express");
const router = app.Router();
const multer = require('multer')

const { clienteSQL } = require("../../sqlCliente/sqlCliente");
const { productsOptions } = require("../../options/index.js");

const csql = new clienteSQL(productsOptions)

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
		console.log("Consultando porductos")
		let allProducts = await csql.selectData('products')
		res.status(200).send({products:allProducts})
	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.get("/:id", async (req, res) => {
	let productId = parseInt(req.params.id)
	let resData = await csql.selectDataById('products',productId)
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

router.post("/", upload.single('thumbnail'), async (req, res) => {
	console.log("Agregando un producto")
	let reqData = req.body
	const file = req.file

	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	delete reqData.submit;
	let newProd = { ...reqData, thumbnail: imgFileName.replace(" ", "-") }
	console.log(newProd)
	try {
		if (Object.keys(reqData).length !== 0) {
			let newRes = await csql.insertData('products',newProd)
			console.log(newRes)
			//TODO crear pagina para confimar la creación del producto
			res.sendFile("404productlist.html",{ root: "public/sections/404"})
		} else {
			res.status(422).send({
				message: "Payload vacio"
			})
		}
	} catch (error) {
		res.status(400).send(`Error al procesar: ${error}`)
	}
});

router.put("/:id", async (req, res) => {
	let productId = req.params.id
	let productData = req.body
	try {
		if (await csql.updateData('products',productId, productData) > 0) {
			res.status(200).send({
				message: "Se han actualiado los datos"
			})
		} else {
			res.status(204).send({
				message: "No se han encontrado datos"
			})
		}

	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.delete("/:id", async (req, res) => {
	let productId = parseInt(req.params.id)
	console.log(`Borrando el producto => id: ${productId}`)
	try {
		if (await csql.deleteData('products',productId) > 0) {
			res.status(200).send({ message: `El item ${productId} fue eliminado` })
		} else {
			res.status(204).send({ message: `No hay registros bajo el id ${productId} ` })

		}
	} catch (error) {
		res.status(400).send(`Error al procesar: ${error}`)

	}

	let a =
		console.log(a)
	res.send("Salio")
	// try {
	// 	res.status(400).send(csql.deleteData(13))
	// } catch (error) {
	// 	res.status(400).send(`Error al eliminar el producto ${error}`)
	// }
});


module.exports = router;
