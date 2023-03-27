const { Schema, model } = require("mongoose");

const cartCollection = "cart"
const cartSchema = new Schema({
    price: Number,
    prod_id: String,
    qtyBought: Number,
    subtotal:Number,
})

const cartModel = model(cartCollection, cartSchema);

module.exports = cartModel;