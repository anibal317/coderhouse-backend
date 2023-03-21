const { Schema, model } = require("mongoose");

const userCollection = "users"
const userSchema = new Schema({
    nombre: String,
    apellido: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const userModel = model(userCollection, userSchema);

module.exports = userModel;