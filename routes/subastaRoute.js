const express = require('express')

const { createSubastaController } = require('../controllers/subastaController')

const router = express.Router()

router.post('/subasta', createSubastaController)

module.exports = {
    router
}