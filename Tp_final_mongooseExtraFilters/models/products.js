const { Schema, model } = require("mongoose");
const paginate = require("mongoose-paginate-v2")



const productsCollection = "products"
const productsSchema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    price: Number,
    stock: Number,
    code:String,
    timeStamp:{
        type: Date,
        default: Date.now()
    },
    status:Boolean
})

productsSchema.plugin(paginate)
const productsModel = model(productsCollection, productsSchema);

module.exports = productsModel;