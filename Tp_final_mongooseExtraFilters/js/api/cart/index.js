const app = require("express");
const router = app.Router();
const cartModel = require('../../../models/cart')
const productsModel = require("../../../models/products")

router.get("/", async (req, res) => {
	console.log("Listando todos los productos")
	try {
		const allCarts = await cartModel.find()
		console.log("Listando los productos, usar psotman para ver los resultados")
		// res.render('productList', { suggestedChamps: JSON.parse(allProducts), listExists: true })
		res.status(200).json({
			status: "Success",
			carts: allCarts
		})

	} catch (error) {
		// res.render('productList', { listExists: false })
		res.status(400).send(`Error al recuperar los datos ${error}`)
		return []
	}
});

router.get("/allCartsId", async (req, res) => {
	console.log(`Listando todos los id de los carts`)
	try {
		const allCarts = await cartModel.find()
		const onlyKeys = allCarts.map(el => el._id)
		// if (oneCart) {
		res.status(200).json({
			status: "Success",
			cart: onlyKeys
		})
	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
})


router.get("/:cid", async (req, res) => {
	let productId = req.params.cid
	console.log(`Listando el producto  => id:${productId}`)
	try {
		const oneCart = await cartModel.findById(productId)
		if (oneCart) {
			res.status(200).json({
				status: "Success",
				cart: oneCart
			})
		} else {
			res.status(400).send("Producto no encontrado")
		}
	} catch (error) {
		res.status(400).send(`Error en consultar los datos ${error}`)
	}
});

router.post("/", async (req, res) => {
	console.log("Agregando elemento al carrito")
	let product = req.body
	console.log(product)

	const cartItems = await cartModel.find()
	const existElement = cartItems.find((item, index) => item.prod_id === product.prod_id)

	// userId: String,
	// products: Array,
	// creationDate: {
	//     type:Date,
	//     default: Date.now()
	// },
	// state:{
	//     type: Boolean,
	//     default:0
	// },
	// total:Number,

	// if (existElement) {
	// 	const result = await cartModel.findOneAndUpdate(existElement._id, {
	// 		qtyBought: existElement.qtyBought + product.qtyBought,
	// 		subTotal: existElement.subTotal + product.subTotal
	// 	})
	// 	res.status(200).json({
	// 		status: "Succes",
	// 		res: result
	// 	})

	// } else {

	// 	try {
	// 		const prodCreated = await cartModel.create(product)
	// 		res.status(200).json({ satatus: "Success", result: prodCreated })
	// 	} catch (error) {
	// 		res.status(400).json({ message: `Error al procesar: ${error}` })
	// 	}
	// }

});

router.put("/:cid/product/:pid", async (req, res) => {
	const productId = req.params.pid
	const cartId = req.params.cid
	console.log("Cart:", cartId, "Producto:", productId)
	try {
		const cart = await cartModel.findById(cartId)
		const products = await productsModel.findById(productId)

		let exitsProduct = cart.products.findIndex(el => el.id === productId)

		if (exitsProduct >= 0) {
			console.log(cart.products)
			let newElement = cart.products[exitsProduct]
			newElement.qty = newElement.qty + 1
			newElement.total = newElement.price * newElement.qty
			let total = cart.products.reduce((anterior, actual) => anterior + actual.total, 0)

			console.log(cart)
			let result = await cartModel.findOneAndUpdate({ _id: cartId }, { products: newElement, total })

			res.json("ok")
		} else {
			let newElement = {
				price: products.price,
				qty: 1,
				total: products.price,
				id: products._id.toString()
			}
			let newArrElements = [...cart.products, newElement]
			let total = newArrElements.reduce((anterior, actual) => anterior + actual.total, 0)
			console.log(newArrElements)
			console.log(total)
			let result = await cartModel.findOneAndUpdate({ _id: cartId }, { products: newArrElements, total })

			res.json('Se agrega elelemnto al carrito')
		}

	} catch {
		res.send("Error en alguno de los archivos")
	}

});

router.delete('/:cid', async function (req, res) {
	let cartId = req.params.cid
	console.log(`Borrando el producto => id: ${cartId}`)
	const result = await cartModel.deleteOne({ _id: cartId }).then(() => {
		console.log(result, "result")
		res.status(200).json({
			message: result,
			status: "Success"
		})
	}).catch(err => {
		res.status(404).json({
			message: err
		})

	})

})


router.delete("/:cid/product/:pid", async (req, res) => {
	const productId = req.params.pid
	const cartId = req.params.cid
	try {
		const cart = await cartModel.findById(cartId)
		const productIdx = cart.products.findIndex(el => el.id === productId)
		cart.products.splice(productIdx, 1)
		let total = cart.products.reduce((anterior, actual) => anterior + actual.total, 0)
		let result = await cartModel.findOneAndUpdate({ _id: cartId }, { products: cart.products, total })
		res.send("Cart Actualizado")
		// res.status(400).send(`Elemento eliminado`)
	} catch (error) {
		res.status(400).send(`Error al eliminar el producto ${error}`)
	}
});


module.exports = router;
