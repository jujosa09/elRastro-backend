const express = require('express')

const { createSubastaController, getSubastaByIdController } = require('../controllers/subastaController')

const routerSubasta = express.Router()

routerSubasta.post('/', createSubastaController)
routerSubasta.get('/', getSubastaByIdController)
routerSubasta.get('/:id', getSubastaByIdController)


module.exports = {
    routerSubasta
}


