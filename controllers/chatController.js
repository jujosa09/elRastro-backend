const ServiceChat = require('../services/chatService');
const serviceChat = new ServiceChat();

const listarChats = async (req, res) => {
    try {
        if(typeof req.query.usuario === 'undefinded'){
            const chat = await serviceChat.findChat(
                req.query.vendedor,
                req.query.comprador,
                req.query.producto
            );
            res.status(200).send(chat);
        }else{
            const chats = await serviceChat.findChatsByUser(req.query.usuario);
            console.log(chats);
            res.status(200).send({chats: chats});
        }

    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const crearChat = async (req, res) => {
    try {
        const chat = await serviceChat.create(
            req.body.vendedor,
            req.body.comprador,
            req.body.producto
        );
        res.status(200).send({message: 'Chat creado con éxito', chat: chat});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const mandarMensaje = async (req, res) => {
    try{
        const chat = await serviceChat.sendMessage(req.body.chat, req.body.mensaje)
        res.status(200).send({chat: chat});
    }catch (error){
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarChats, crearChat, mandarMensaje}