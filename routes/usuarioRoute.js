const express = require('express')

const { createUsuarioController, getUsuarioByIdController, deleteUsuarioController, updateUsuarioController } = require('../controllers/usuarioController')

const routerUsuario = express.Router()

routerUsuario.post('/', createUsuarioController)
routerUsuario.get('/', getUsuarioByIdController)
routerUsuario.get('/:id', getUsuarioByIdController)
routerUsuario.delete('/:id', deleteUsuarioController)
routerUsuario.put('/:id', updateUsuarioController)



module.exports = {
    routerUsuario
}
