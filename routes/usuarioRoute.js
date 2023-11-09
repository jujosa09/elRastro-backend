const express = require('express')

const { createUsuarioController, getUsuarioByIdController, deleteUsuarioController, updateUsuarioController } = require('../controllers/usuarioController')

const routerUsuario = express.Router()

routerUsuario.post('/', createUsuarioController)
routerUsuario.get('/', getUsuarioByIdController)
routerUsuario.delete('/:id', deleteUsuarioController)
routerUsuario.put('/', updateUsuarioController)

module.exports = {
    routerUsuario
}
