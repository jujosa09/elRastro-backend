const express = require('express')

const { createSubastaController, getSubastaByIdController } = require('../controllers/subastaController')

const router = express.Router()

router.post('/subasta', createSubastaController)
router.get('/subasta/:id', getSubastaByIdController)


module.exports = {
    router
}


