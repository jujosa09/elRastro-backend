const {getCoordinatesFromPostalCode} = require('../controllers/carbonoController')
const express = require('express')

const routerCarbono = express.Router()

routerCarbono.get('/coord', getCoordinatesFromPostalCode)

module.exports = {
    routerCarbono
}
