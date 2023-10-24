const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    _id: Number,
    nombre: String,
    valoracion: Number
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario
