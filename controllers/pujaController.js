const ServicePuja = require('../services/pujaService');
const servicePuja = new ServicePuja();

const listarPujas = async (req, res) => {
    try {
        const pujas = await servicePuja.findAll();
        res.status(200).send(pujas);
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const listarPujasPorProducto = async (req, res) => {
    try {
        const pujas = await servicePuja.findByProduct(req.params.producto);
        res.status(200).send(pujas);
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const guardarPuja = async (req, res) => {
    try {
        if (typeof req.query.id !== "undefined" && req.query.id !== null && req.query.id !== '') {
            const puja = await servicePuja.update(
                req.query.id,
                req.query.usuario,
                req.query.cantidad,
                Date(),
                req.query.producto
            )
            res.send({statusCode: 200, message: "Puja actualizada con éxito"});
        } else {
            const mensaje = await servicePuja.checkPuja(req.query.usuario, req.query.cantidad, req.query.producto);

            if (mensaje !== 'ok') {
                res.status(200).send(mensaje);
            } else {
                const pujaCreada = await servicePuja.create(
                    req.query.usuario,
                    req.query.cantidad,
                    Date(),
                    req.query.producto
                )
                res.status(200).send('Puja creada con éxito');
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const borrarPuja = async (req, res) => {
    try {
        await servicePuja.delete(req.params.id);
        res.status(200).send('Puja borrada con éxito');
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarPujas, listarPujasPorProducto, guardarPuja, borrarPuja}