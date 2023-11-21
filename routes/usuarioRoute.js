const express = require('express')

const { createUsuarioController, getUsuarioByIdController, deleteUsuarioController, updateUsuarioController, 
    updateValoracionController, getRatingUsuarioController } = require('../controllers/usuarioController')

const routerUsuario = express.Router()

routerUsuario.post('/', createUsuarioController)
routerUsuario.get('/', getUsuarioByIdController)
routerUsuario.delete('/:id', deleteUsuarioController)
routerUsuario.put('/', updateUsuarioController)
routerUsuario.put('/valoracion', updateValoracionController)
routerUsuario.get('/valoracion', getRatingUsuarioController)

module.exports = {
    routerUsuario
}
