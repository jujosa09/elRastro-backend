const {notifyPurchaseController} = require('../controllers/emailController')
const express = require('express')

const routerEmail = express.Router()

routerEmail.post('/confirm', notifyPurchaseController)

module.exports = {
    routerEmail
}
