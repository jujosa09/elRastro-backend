const express = require('express')
const routerPuja = express.Router()
const pujaController = require('../controllers/pujaController')

routerPuja.get('/', pujaController.listarPujas)
            .get('/:producto', pujaController.listarPujasPorProducto)
            .post('/', pujaController.guardarPuja)
            .put('/', pujaController.guardarPuja)
            .delete('/:id', pujaController.borrarPuja);


module.exports = {routerPuja};


