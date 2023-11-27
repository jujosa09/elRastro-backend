const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    nombre: String,
    correo: {type:String, unique: true},
    valoracion: [JSON]
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario
