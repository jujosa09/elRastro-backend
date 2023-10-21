const express = require('express')

const { createSubastaController, getSubastaByIdController } = require('../controllers/subastaController')

const routerSubasta = express.Router()

routerSubasta.post('/subasta', createSubastaController)
routerSubasta.get('/subasta/:id', getSubastaByIdController)


module.exports = {
    routerSubasta
}


