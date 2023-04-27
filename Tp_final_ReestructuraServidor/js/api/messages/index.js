const app = require("express");
const router = app.Router();
const messagesModel = require("../../../models/messages")

router.get("/", async (req, res) => {
	console.log("Obteniendo mensajes")
	try {
		
		const allMessages = await messagesModel.find()
		res.status(200).json({
			status: "Success",
			messages: allMessages
		})

	} catch (error) {
		// res.render('productList', { listExists: false })
		res.status(400).send(`Error al recuperar los datos ${error}`)

		return []
	}
});

router.post("/",async(req,res)=>{
	console.log("Guardando mensajes")
	const message = req.body.message
	try {
		const saveMessages = await messagesModel.create(message)
		res.status(200).json({
			status:"Success",
			info:saveMessages
		})
	} catch (error) {
		
	}
})

module.exports = router;
