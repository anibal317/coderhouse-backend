const app = require("express");
const router = app.Router();
const { clienteSQL } = require("../../sqlCliente/sqlCliente");
const { msgOptions } = require("../../options/index.js");

const csql = new clienteSQL(msgOptions)


router.get("/", async (req, res) => {
	console.log("Centro de mensajes")
	try {
		// res.render('centroDeMensajes')
		res.status(200).send("Sale")

	} catch (error) {
		// res.render('productList', { listExists: false })
		res.status(400).send(`Error al recuperar los datos ${error}`)

		return []
	}
});

router.get("/createTable", async (req, res) => {
	// res.send("Creando base y tablas")
	console.log("Consultando datos messages")
	console.log( await csql.selectData('products'))
	res.status(200).send("Finalizado")
})

module.exports = router;
