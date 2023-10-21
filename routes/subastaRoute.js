const express = require('express')

const { createSubastaController, getSubastaByIdController, deleteSubastaController, actualizarSubastaController } = require('../controllers/subastaController')

const router = express.Router()

router.post('/subasta', createSubastaController)
router.get('/subasta', getSubastaByIdController)
router.delete('/subasta/:id',  deleteSubastaController)
router.put('/subasta', actualizarSubastaController)

module.exports = {
    router
}