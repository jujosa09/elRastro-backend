const express = require('express')

const { createUsuarioController, getUsuarioByIdController, deleteUsuarioController, updateUsuarioController } = require('../controllers/usuarioController')

const routerUsuario = express.Router()

routerUsuario.post('/', createUsuarioController)
routerUsuario.get('/', getUsuarioByIdController)
routerUsuario.get('/:id', getUsuarioByIdController)
routerUsuario.get('/:nombre', getUsuarioByIdController)
routerUsuario.delete('/', deleteUsuarioController)
routerUsuario.delete('/:id', deleteUsuarioController)
routerUsuario.put('/', updateUsuarioController)
routerUsuario.put('/:id', updateUsuarioController)



module.exports = {
    routerUsuario
}
