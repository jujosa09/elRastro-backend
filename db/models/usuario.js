const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    _id: Number,
    nombre: String,
    valoracion: JSON
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario
