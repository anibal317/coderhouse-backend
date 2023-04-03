const { Schema, model } = require("mongoose");

const messagesCollection = "messages"
const messagesSchema = new Schema({
    user: String,
    message: String,
    time: String
})

const messagesModel = model(messagesCollection, messagesSchema);

module.exports = messagesModel;