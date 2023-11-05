const express = require('express')

const { createSubastaController, getSubastaByIdController, getCoordinatesFromPostalCode} = require('../controllers/subastaController')

const routerSubasta = express.Router()

routerSubasta.post('/', createSubastaController)
routerSubasta.get('/', getSubastaByIdController)
routerSubasta.get('/:id', getSubastaByIdController)
routerSubasta.get('/postal/:codPostal', getCoordinatesFromPostalCode)


module.exports = {
    routerSubasta
}


