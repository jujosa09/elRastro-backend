const ServicePuja = require('../services/pujaService');
const servicePuja = new ServicePuja();

const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();

const listarPujas = async (req, res) => {
    try {
        if (typeof req.query.usuario === 'undefined' && typeof req.query.producto === 'undefined') {
            const pujas = await servicePuja.findAll();
            res.status(200).send({pujas: pujas});
        } else if (typeof req.query.producto === 'undefined') {
            const pujas = await servicePuja.findByUser(req.query.usuario);
            res.status(200).send({pujas: pujas});
        } else if (typeof req.query.usuario === 'undefined') {
            const pujas = await servicePuja.findByProduct(req.query.producto);
            res.status(200).send({pujas: pujas});
        } else {
            const pujas = await servicePuja.findByUserAndProduct(req.query.usuario, req.query.producto);
            res.status(200).send({pujas: pujas});
        }

    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const guardarPuja = async (req, res) => {
    try {
        if (typeof req.body.id !== "undefined" && req.body.id !== null && req.body.id !== '') {
            const pujaActualizada = await servicePuja.update(
                req.body.id,
                req.body.usuario,
                req.body.cantidad,
                Date(),
                req.body.producto
            )
            res.status(200).send({message: 'Puja actualizada con éxito', puja: pujaActualizada});
        } else {
            const check = await servicePuja.checkPuja(req.body.usuario, req.body.cantidad, req.body.producto);

            if (check !== 'ok') {
                res.status(200).send(check);
            } else {
                const pujaCreada = await servicePuja.create(
                    req.body.usuario,
                    req.body.cantidad,
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
        const puja = await servicePuja.delete(req.params.id);
        if (puja) {
            res.status(200).send({message: 'Puja ' + req.params.id + ' borrada con éxito', puja: puja});
        } else {
            res.status(200).send({message: 'No existe la puja ' + req.params.id});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarPujas, guardarPuja, borrarPuja}