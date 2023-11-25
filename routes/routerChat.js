const express = require('express')
const routerChat = express.Router()
const chatController = require('../controllers/chatController')

routerChat.get('/', chatController.listarChats)
            .post('/', chatController.crearChat)
            .put('/send', chatController.mandarMensaje)

module.exports = {routerChat};