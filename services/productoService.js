const Producto = require('../db/models/producto');

class ServiceProducto {
    constructor() {}

    async findAll() {
        const res = await Producto.find();
        return res;
    }

    async findById(id) {
        const res = await Producto.findById(id);
        return res;
    }

    async findByNombre(nombre) {
        const res = await Producto.find(
            {
                nombre: nombre
            }
        );
        return res;
    }

    async findByUsuario(usuario) {
        const res = await Producto.find(
            {
                usuario: usuario
            }
        );
        return res;
    }

    async findByPrecio(precio) {
        const res = await Producto.find(
            {
                precioActual: precio
            }
        );
        return res;
    }

    async checkProducto(nombre, usuario) {
        const productosUsuario = await this.findByUsuario(usuario);
        let i = 0;
        while (i < productosUsuario.length && productosUsuario[i].nombre !== nombre) {
            i++;
        }

        return i < productosUsuario.length?
            'Ya existe un producto con el mismo nombre para el usuario ' + usuario : 'ok';
    }

    async create(nombre, direccion, usuario, precioInicial, fechaCierre, descripcion, imagen) {
        const res = await Producto.create(
            {
                nombre: nombre,
                direccion: direccion,
                usuario: usuario,
                precioInicial: precioInicial,
                fechaCierre: fechaCierre,
                descripcion: descripcion,
                precioActual: null,
                imagen: imagen,
                puja: {}
            }
        );
        return res;
    }

    async checkProductoActualizable(id) {
        const producto = await this.findById(id);
        // COMPROBAR SI CUANDO SE ELIMINA ALGUNA PUJA LA CONDICIÓN SIGUE SIENDO VERDAD
        if (!producto.puja) {
            return 'ok';
        } else {
            return 'No se puede actualizar el producto ' + id + ' porque ya han pujado sobre él';
        }
    }

    async update(id, nombre, direccion, descripcion, imagen) {
        const res = await Producto.findByIdAndUpdate(id,
            {
                nombre: nombre,
                direccion: direccion,
                descripcion: descripcion,
                imagen: imagen
            }
        );
        return res;
    }

    async updatePuja(id, puja) {
        const res = await Producto.findByIdAndUpdate(id,
            {
                puja: puja
            }
        );
    }

    async delete(id) {
        const producto = await this.findById(id);
        const res = await Producto.findByIdAndDelete(id);
        return producto;
    }
}

module.exports = ServiceProducto;