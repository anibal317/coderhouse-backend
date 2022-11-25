const app = require("express");
const router = app.Router();
const { clienteSQL } = require("../../clienteSQLForMessages");
const csql = new clienteSQL()



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


module.exports = router;
