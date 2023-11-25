const Chat = require('../db/models/chat');


function formatarFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses comienzan desde 0
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
}

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

    async findChatsByUser(usuario){
        const list1 = await Chat.find(
            {
                vendedor: usuario
            });
        const list2 = await Chat.find(
            {
               comprador: usuario
            });
        return list1.concat(list2);
    }

    async create(vendedor, comprador, producto) {
        const chatCreado = await Chat.create(
            {
                vendedor: vendedor,
                comprador: comprador,
                producto: producto,
                mensajes: {}
            }
        );
        return chatCreado;
    }

    async sendMessage(chat, mensaje){
        const nuevoMensaje = {
            texto: mensaje,
            fecha: formatarFecha()
        }
        const newChat = await Chat.findByIdAndUpdate(chat,
            {
                $push: {mensajes: nuevoMensaje}
            },{new: true});
        return newChat;
    }

}

module.exports = ServiceChat;