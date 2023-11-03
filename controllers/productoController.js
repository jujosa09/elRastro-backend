const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();

const listarProductos = async(req, res) => {
    try {
        if (typeof req.params.usuario !== "undefined" && req.params.usuario !== null && req.params.usuario !== '') {
            const productos = await serviceProducto.findByUsuario(req.params.usuario);
            res.status(200).send(productos);
        } else {
            const productos = await serviceProducto.findAll();
            res.status(200).send(productos);
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const guardarProducto = async(req, res) => {
    try {
        console.log(req.body);
        if (typeof req.body.id !== "undefined" && req.body.id !== null && req.body.id !== '') {
            const producto = await serviceProducto.update(
                req.body.id,
                req.body.nombre,
                req.body.direccion,
                req.body.descripcion,
                req.body.imagen
            );
            res.status(200).send('Producto actualizado con éxito');
        } else {
            const check = await serviceProducto.checkProducto(req.body.nombre, req.body.usuario);

            if (check !== 'ok') {
                res.status(200).send(check);
            } else {
                const producto = await serviceProducto.create(
                    req.body.nombre,
                    req.body.direccion,
                    req.body.usuario,
                    req.body.precioInicial,
                    req.body.fechaCierre,
                    req.body.descripcion,
                    req.body.imagen
                )
                res.status(200).send(producto);
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const borrarProducto = async (req, res) => {
    try {
        await serviceProducto.delete(req.params.id);
        res.status(200).send('Producto ' + req.params.id + ' borrado con éxito');
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarProductos, guardarProducto, borrarProducto}