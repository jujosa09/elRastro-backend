const { Schema, model } = require('mongoose')

const valoracionSchema = new Schema({
    _id: Number,
    usuarioValorado: String,
    usuario: String,
    rating: Number,
    idSubasta: Number
})

const Valoracion = model('Valoracion', valoracionSchema)

module.exports = Valoracion