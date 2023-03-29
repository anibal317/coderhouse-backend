const { Schema, model } = require("mongoose");

const userCollection = "users"
const userSchema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, index: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    confirmed: { type: Boolean, default: false },
    rol: { type: String, default: "user" },
    carts: { type: Array, default: [] }
})

const userModel = model(userCollection, userSchema);

module.exports = userModel;