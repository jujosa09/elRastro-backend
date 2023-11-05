const {Schema, model} = require('mongoose')

const productoSchema = new Schema({
    nombre: String,
    direccion: Number,
    usuario: String,
    precioInicial: Number,
    fechaCierre: Date,
    descripcion: String,
    imagen: String,
    puja: JSON
})

const Producto = model('Producto', productoSchema)

module.exports = Producto