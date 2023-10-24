const {Schema, model} = require('mongoose')

const subastaSchema = new Schema({
    _id: Number,
    nombre: String,
    valoracion: Number
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario
