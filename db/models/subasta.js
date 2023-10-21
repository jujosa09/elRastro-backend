const {Schema, model} = require('mongoose')

const subastaSchema = new Schema({
    _id: Number,
    producto: String,
    direccion: Number,
    usuario: String,
    precioInicial: Number,
    fechaCierre: Date,
    descripcion: String,
    precioActual: Number,
    image: String,
    puja: JSON
})

const Subasta = model('Subasta', subastaSchema)

module.exports = Subasta
