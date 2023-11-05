const ServicePuja = require('../services/pujaService');
const servicePuja = new ServicePuja();

const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();

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
        if (typeof req.body.id !== "undefined" && req.body.id !== null && req.body.id !== '') {
            const puja = await servicePuja.update(
                req.body.id,
                req.body.usuario,
                req.body.cantidad,
                Date(),
                req.body.producto
            )
            res.status(200).send({message: 'Puja actualizada con éxito', puja: puja});
        } else {
            const check = await servicePuja.checkPuja(req.body.usuario, req.body.cantidad, req.body.producto);

            if (check !== 'ok') {
                res.status(200).send(check);
            } else {
                const pujaCreada = await servicePuja.create(
                    req.body.usuario,
                    req.body.cantidad,
                    Date(),
                    req.body.producto
                )
                await serviceProducto.updatePuja(req.body.producto, pujaCreada);
                res.status(201).send({message: 'Puja creada con éxito', puja: pujaCreada});
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