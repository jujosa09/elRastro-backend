const express = require('express')
const routerProducto = express.Router()
const productoController = require('../controllers/productoController')

routerProducto.get('/', productoController.listarProductos)
            //.get('/:usuario', productoController.listarProductos)
            .post('/filter', productoController.filtrarProductos)
            .get('/byPujas', productoController.listarProductosPorPujasUsuario)
            .post('/', productoController.guardarProducto)
            .put('/', productoController.guardarProducto)
            .delete('/:id', productoController.borrarProducto);

module.exports = {routerProducto};