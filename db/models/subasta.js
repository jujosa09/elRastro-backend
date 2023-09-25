const {Schema, model} = require('mongoose')

const subastaSchema = new Schema({
    producto: String,
    direccion: Number,
    usuario: String,
    precioInicial: Number,
    fechaCierre: Date,
    descripcion: String,
    precioActual: Number
})

const Subasta = model('Subasta', subastaSchema)

module.exports = Subasta
