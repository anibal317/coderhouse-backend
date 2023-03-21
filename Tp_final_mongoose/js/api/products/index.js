const app = require("express");
const router = app.Router();
const multer = require('multer')
const productsModel = require("../../../models/products")



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
		const allProducts = await productsModel.find()
		res.status(200).json({
			status: "Success",
			products: allProducts
		})
	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.get("/:id", async (req, res) => {
	let productId = req.params.id
	console.log("Consultando producto por id: ", productId)
	try {
		let resData = await productsModel.findById(productId)
		res.status(200).json(resData)
	} catch (error) {
		if (error.name === "CastError") {
			res.status(404).json({
				message: "Id invalido"
			})
		} else {
			res.status(400).json({ message: `Error en consultar los datos`, info: error })
		}
	}
});

router.post("/", upload.single('thumbnail'), async (req, res) => {
	console.log("Agregando un producto")
	let reqData = req.body
	const file = req.file

	// if (!file) {
	// 	const error = new Error('Please upload a file')
	// 	error.httpStatusCode = 400
	// 	return next(error)
	// }
	delete reqData.submit;
	// let newProd = { ...reqData, thumbnail: imgFileName.replace(" ", "-") }
	try {
		if (Object.keys(reqData).length !== 0) {
			let resultado = await productsModel.create(reqData)
			res.sendFile("success.html", { root: "public/sections/success" })
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
		if (await csql.updateData('products', productId, productData) > 0) {
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
	let productId = req.params.id
	console.log(`Borrando el producto => id: ${productId}`)
	try {
		// if (await csql.deleteData('products', productId) > 0) {
		let result = await productsModel.deleteOne({ id: productId });
		res.status(200).json({ message: `El item ${productId} fue eliminado`, info: result })
		// } else {
		// res.status(204).send({ message: `No hay registros bajo el id ${productId} ` })

		// }
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
