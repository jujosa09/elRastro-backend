const ServiceChat = require('../services/chatService');
const serviceChat = new ServiceChat();

const getChat = async (req, res) => {
    try {
        const chat = await serviceChat.findChat(
            req.query.vendedor,
            req.query.comprador,
            req.query.producto
        );
        res.status(200).send(chat);
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const guardarChat = async (req, res) => {
    try {
        const chat = await serviceChat.create(
            req.query.vendedor,
            req.query.comprador,
            req.query.producto
        );
        res.status(200).send('Chat creado con éxito');
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {getChat, guardarChat}