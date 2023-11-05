const Chat = require('../db/models/chat');

class ServiceChat {

    constructor() {}

    async findChat(vendedor, comprador, producto) {
        const res = await Chat.find(
            {
                vendedor: vendedor,
                comprador: comprador,
                producto: producto
            });
        return res;
    }

    async create(vendedor, comprador, producto) {
        const res = await Chat.create(
            {
                vendedor: vendedor,
                comprador: comprador,
                producto: producto,
                mensajes: {}
            }
        )
    }

}

module.exports = ServiceChat;