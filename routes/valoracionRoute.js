const express = require('express')
const { createValoracionController, deleteValoracionController } = require('../controllers/valoracionController')

const routerValoracion = express.Router()

routerValoracion.post('/', createValoracionController)
routerValoracion.delete('/:id', deleteValoracionController)

module.exports = {
    routerValoracion
}