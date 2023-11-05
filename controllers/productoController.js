const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();

const ServicePuja = require('../services/pujaService');
const servicePuja = new ServicePuja();

const listarProductos = async(req, res) => {
    try {
        if (typeof req.params.usuario !== "undefined" && req.params.usuario !== null && req.params.usuario !== '') {
            const productos = await serviceProducto.findByUsuario(req.params.usuario);
            res.status(200).send({productos: productos});
        } else {
            const productos = await serviceProducto.findAll();
            res.status(200).send({productos: productos});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const guardarProducto = async(req, res) => {
    try {
        if (typeof req.body.id !== "undefined" && req.body.id !== null && req.body.id !== '') {
            const check = await  serviceProducto.checkProductoActualizable(req.body.id);
            if (check !== 'ok') {
                res.status(200).send({message: check});
            } else {
                const producto = await serviceProducto.update(
                       req.body.id,
                       req.body.nombre,
                       req.body.direccion,
                       req.body.descripcion,
                       req.body.imagen
                   );
                res.status(200).send({message: 'Producto ' + req.body.id + ' actualizado con éxito', producto: producto});
            }
        } else {
            const check = await serviceProducto.checkProducto(req.body.nombre, req.body.usuario);

            if (check !== 'ok') {
                res.status(200).send({message: check});
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
                res.status(201).send({message: 'Producto creado con éxito', producto: producto});
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const borrarProducto = async (req, res) => {
    try {
        const producto = await serviceProducto.delete(req.params.id);
        await servicePuja.deletePujasByProduct(req.params.id);
        res.status(200).send({message: 'Producto ' + req.params.id + ' borrado con éxito', producto: producto});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarProductos ,guardarProducto, borrarProducto}