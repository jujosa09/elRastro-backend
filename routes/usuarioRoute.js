const express = require('express')

const { createUsuarioController, getUsuarioByIdController } = require('../controllers/usuarioController')

const routerUsuario = express.Router()

//routerSubasta.post('/', createSubastaController)
//routerSubasta.get('/', getSubastaByIdController)
//routerSubasta.get('/:id', getSubastaByIdController)


module.exports = {
    routerUsuario
}
