const { Schema, model } = require("mongoose");

const productsCollection = "products"
const productsSchema = new Schema({
    title: String,
    thumbnail: String,
    price: Number,
    stock: Number,
    category:Number,
    status:Boolean
})

const productsModel = model(productsCollection, productsSchema);

module.exports = productsModel;