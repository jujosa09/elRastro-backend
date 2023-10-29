const Puja = require('../db/models/puja');

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
        const res = await Puja.create(
            {
                usuario: usuario,
                cantidad: cantidad,
                fecha: fecha,
                producto: producto
            }
        );
        return res;
    }

    async checkPuja(usuario, cantidad, producto) {
        const pujasProducto = await this.findByProduct(producto);
        const pujaMasAlta = pujasProducto.slice(-1)[0];

        if (pujaMasAlta.usuario === usuario) {
            return 'Ya eres el usuario con la puja más alta para el producto ' + producto;
        } else if (pujaMasAlta.cantidad > cantidad) {
            return 'La puja no supera la puja más alta para el producto ' + producto;
        } else {
            return 'ok';
        }
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
        // const puja = await this.findById(id);
        const res = await Puja.findByIdAndDelete(id);
        return res;
    }
}

module.exports = ServicePuja;