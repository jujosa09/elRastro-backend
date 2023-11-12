const {getCoordinatesFromPostalCode, getHuellaCarbono} = require('../controllers/carbonoController')
const express = require('express')

const routerCarbono = express.Router()

routerCarbono.get('/coord', getCoordinatesFromPostalCode)
            .get('/huella', getHuellaCarbono)

module.exports = {
    routerCarbono
}
