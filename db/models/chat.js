const {Schema, model} = require('mongoose')

// Cambiar tipos de datos para guardar los ids

const chatSchema = new Schema({
    vendedor: String,
    comprador: String,
    producto: Number,
    mensajes: JSON
})

const Chat = model('Chat', chatSchema)

module.exports = Chat