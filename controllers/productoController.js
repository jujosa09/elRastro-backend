const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();

const ServicePuja = require('../services/pujaService');
const servicePuja = new ServicePuja();

const ServiceUsuario = require('../services/usuarioService')
const serviceUsuario = new ServiceUsuario()

const listarProductos = async(req, res) => {
    try {
        if (typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== '') {
            const producto = await serviceProducto.findById(req.params.id);
              res.status(200).send({producto: producto});
          } else if (typeof req.query.usuario !== 'undefined' && req.query.usuario !== null && req.query.usuario !== '') {
              const productos = await serviceProducto.findByUsuario(req.query.usuario);
              res.status(200).send({productos: productos});
          } else {
              const productos = await serviceProducto.findAll(req.query.filter);
              res.status(200).send({productos: productos});
          }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const filtrarProductos = async(req, res) => {
    try {
        const productos = await serviceProducto.filterProductos(req.body.nombre, req.body.descripcion);
        res.status(200).send({productos: productos});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const listarProductosPorPujasUsuario = async(req, res) => {
    try {
        const pujas = await servicePuja.findByUser(req.query.usuario);
        const productosByPujas = await serviceProducto.findByPujasUsuario(pujas);
        res.status(200).send({productos: productosByPujas});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const guardarProducto = async(req, res) => {
    try {
        
        if (typeof req.body.id !== "undefined" && req.body.id !== null && req.body.id !== '') {
            const check = await  serviceProducto.checkProductoActualizable(req.body.id);
            if (check !== 'ok') {
                res.status(409).send({message: check});
            } else {
                const producto = await serviceProducto.update(
                       req.body.id,
                       req.body.nombre,
                       req.body.direccion,
                       req.body.descripcion
                   );
                res.status(200).send({message: 'Producto ' + req.body.id + ' actualizado con éxito', producto: producto});
            }
        } else {
            const usuario = serviceUsuario.getUsuarioByCorreo(req.body.usuario)

            if(usuario === null){
                res.status(400).send("El usuario no existe")
            }else{
                const check = await serviceProducto.checkProducto(req.body.nombre, req.body.usuario);
                //if (check !== 'ok') {
                if (false){
                    res.status(409).send({message: check});
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
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const borrarProducto = async (req, res) => {
    try {
        const producto = await serviceProducto.delete(req.params.id);
        if (producto) {
            await servicePuja.deletePujasByProduct(req.params.id);
            res.status(200).send({message: 'Producto ' + req.params.id + ' borrado con éxito', producto: producto});
        } else {
            res.status(400).send({message: 'No existe el producto ' + req.params.id});
        }

    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarProductos, listarProductosPorPujasUsuario, guardarProducto, borrarProducto, filtrarProductos}