const Producto = require('../db/models/producto');
//const axios = require('axios');

class ServiceProducto {
    constructor() {}

    async findAll() {
        const res = await Producto.find().sort({fechaInicio: -1});
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
        ).sort({fechaInicio: -1});
        return res;
    }

    async findByPujasUsuario(pujas) {
        let productosByPujas = [];
        for (let i = 0; i < pujas.length; i++) {
            await this.processProductosByPujas(pujas[i].producto, pujas[i], productosByPujas);
        }
        return productosByPujas;
    }

    async processProductosByPujas(productoId, puja, productosByPujas) {
        let j = 0;
        while (j < productosByPujas.length && productosByPujas[j].producto.id !== productoId) {
            j++;
        }

        if (j >= productosByPujas.length) {
            const producto = await this.findById(productoId);
            productosByPujas.push({producto: producto, pujas: [puja]});
        } else {
            productosByPujas[j].pujas.push(puja);
        }
    }

    async findByPrecio(precio) {
        const res = await Producto.find(
            {
                precioActual: precio
            }
        );
        return res;
    }

    async filterProductos(nombre, descripcion) {
        if (typeof nombre === 'undefined' && typeof descripcion == 'undefined') {
            const res = await this.findAll().sort({fechaInicio: -1});
            return res;
        } else {
            const res = await Producto.find(
                {
                    nombre: {
                        '$regex': nombre,
                        '$options': 'i'
                    },

                    descripcion: {
                        '$regex': descripcion,
                        '$options': 'i'
                    }
                }
            ).sort({fechaInicio: -1});
            return res;
        }
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
                fechaInicio: Date(),
                fechaCierre: fechaCierre,
                descripcion: descripcion,
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

    async update(id, nombre, direccion, descripcion) {
        const res = await Producto.findByIdAndUpdate(id,
            {
                nombre: nombre,
                direccion: direccion,
                descripcion: descripcion
            },
            { new: true }
        );
        return res;
    }

    async updatePuja(id, puja) {
        const res = await Producto.findByIdAndUpdate(id,
            {
                puja: puja
            },
            { new: true }
        );
    }

    async delete(id) {
        const producto = await this.findById(id);
        const res = await Producto.findByIdAndDelete(id);
        return producto;
    }

}

module.exports = ServiceProducto;