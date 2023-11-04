const Puja = require('../db/models/puja');
const ServiceProducto = require('./productoService');
const serviceProducto = new ServiceProducto();

class ServicePuja {
    constructor() {}

    async findAll() {
        const res = await Puja.find();
        return res;
    }

    async findById(id) {
        const res = await Puja.findById(id);
        return res;
    }

    async findByProduct(idProducto) {
        const res = await Puja.find({
            producto: idProducto
        })
        return res;
    }

    async findByUser(idUsuario) {
        const res = await Puja.find({
            usuario: idUsuario
        })
        return res;
    }

    async create(usuario, cantidad, fecha, producto) {
        const pujaCreada = await Puja.create(
            {
                usuario: usuario,
                cantidad: cantidad,
                fecha: fecha,
                producto: producto
            }
        );
        await serviceProducto.updatePuja(producto, pujaCreada);
        return pujaCreada;
    }

    async checkPuja(usuario, cantidad, producto) {
        const pujasProducto = await this.findByProduct(producto);
        const foundProducto = await serviceProducto.findById(producto);

        if(foundProducto.usuario === usuario) {
            return 'Eres el propietario del producto ' + producto + ' y no puedes hacer pujas sobre él';
        }else {
            if (pujasProducto.length > 0) {
                const pujaMasAlta = pujasProducto.slice(-1)[0];
                if (pujaMasAlta.usuario === usuario) {
                    return 'Ya eres el usuario con la puja más alta para el producto ' + producto;
                } else if (pujaMasAlta.cantidad > cantidad) {
                    return 'La puja no supera la puja más alta para el producto ' + producto;
                } else {
                    return 'ok';
                }
            }
        }

        if (cantidad < foundProducto.precioInicial) {
            return 'La cantidad a pujar debe ser mayor que el precio inicial del producto';
        }

        return 'ok';
    }

    async update(id, usuario, cantidad, fecha, producto) {
        const res = await Puja.findByIdAndUpdate(id,
            {
                usuario: usuario,
                cantidad: cantidad,
                fecha: fecha,
                producto: producto
            }
        );
        return res;
    }

    async delete(id) {
        const res = await Puja.findByIdAndDelete(id);
        return res;
    }
}

module.exports = ServicePuja;