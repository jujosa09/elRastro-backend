const express = require('express')
const { createValoracionController, deleteValoracionController } = require('../controllers/valoracionController')

const routerValoracion = express.Router()

routerValoracion.post('/valoracion', createValoracionController)
routerValoracion.delete('/valoracion/:id', deleteValoracionController)

module.exports = {
    routerValoracion
}