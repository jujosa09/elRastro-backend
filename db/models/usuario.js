const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    nombre: String,
    correo: String,
    valoracion: JSON
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario
