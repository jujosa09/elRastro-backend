const express = require('express')
const routerChat = express.Router()
const chatController = require('../controllers/chatController')

routerChat.get('/', chatController.getChat)
            .post('/', chatController.guardarChat)

module.exports = {routerChat};