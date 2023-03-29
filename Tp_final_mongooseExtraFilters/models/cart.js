const { Schema, model } = require("mongoose");

const cartCollection = "cart"
const cartSchema = new Schema({
    userId: String,
    products: Array,
    creationDate: {
        type:Date,
        default: Date.now()
    },
    state:{
        type: Boolean,
        default:0
    },
    total:Number,
})

const cartModel = model(cartCollection, cartSchema);

module.exports = cartModel;