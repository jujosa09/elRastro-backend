const express = require('express')

const { createUsuarioController, getUsuarioByIdController, deleteUsuarioController, updateUsuarioController,
        updateValoracionController, getRatingUsuarioController, getValoracionUsuarioController,
        checkUserFromGoogle,checkToken
} = require('../controllers/usuarioController')

const routerUsuario = express.Router()

routerUsuario.post('/', createUsuarioController)
routerUsuario.get('/', getUsuarioByIdController)
routerUsuario.delete('/:id', deleteUsuarioController)
routerUsuario.put('/', updateUsuarioController)
routerUsuario.put('/valoracion', updateValoracionController)
routerUsuario.get('/valoracionMedia', getRatingUsuarioController)
routerUsuario.get('/valoracion', getValoracionUsuarioController)
routerUsuario.get('/checkToken', checkToken),
routerUsuario.get('/checkOrCreate', checkUserFromGoogle)

module.exports = {
    routerUsuario
}
