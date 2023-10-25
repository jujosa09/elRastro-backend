const {Schema, model} = require('mongoose')

const pujaSchema = new Schema({
    usuario: String,
    precio: Number,
    fecha: Date,
    producto: Number
})

const Puja = model('Puja', pujaSchema)

module.exports = Puja