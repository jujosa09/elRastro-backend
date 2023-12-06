const Producto = require('../db/models/producto');
const {uploadImage} = require('./imageService')
//const axios = require('axios');

class ServiceProducto {
    constructor() {}

    async findAll(filter = 'Fecha_Desc') {
        let result = [];switch (String(filter)) {
            case "Activa":
                result = await Producto.find({ fechaCierre:{ $gte : new Date()} });
                break;
            case "Finalizada":
                result = await Producto.find({ fechaCierre: { $lte: new Date()} }).sort({ fechaInicio: 1 });
                break;
            case "Precio_Asc":
                result = await Producto.find().sort({ precioInicial: 1 });
                break;
            case "Precio_Desc":
                result = await Producto.find().sort({ precioInicial: -1 });
                break;
            case "Fecha_Asc":
                result = await Producto.find().sort({ fechaInicio: 1 });
                break;
            case "Puja_Asc":
                let productos = await Producto.find();

                // Create an array of promises to get the highest bid for each product
                let promises = productos.map(async (producto) => {
                    const pujaMasAlta = await this.getPujaMasAlta(producto._id);
                    return { producto, pujaMasAlta };
                });

                // Wait for all promises to resolve
                let results = await Promise.all(promises);

                // Sort the array based on the highest bid
                results.sort((a, b) => a.pujaMasAlta - b.pujaMasAlta);

                // Extract the sorted products
                result = results.map((result) => result.producto);

                break;
            case "Puja_Desc":
                let productos1 = await Producto.find();

                // Create an array of promises to get the highest bid for each product
                let promises1 = productos1.map(async (producto) => {
                    const pujaMasAlta = await this.getPujaMasAlta(producto._id);
                    return { producto, pujaMasAlta };
                });

                // Wait for all promises to resolve
                let results1 = await Promise.all(promises1);

                // Sort the array based on the highest bid
                results1.sort((a, b) => b.pujaMasAlta - a.pujaMasAlta);

                // Extract the sorted products
                result = results1.map((result) => result.producto);

                break;

            default:
                result = await Producto.find().sort({ fechaInicio: -1 });
                break;
        }
        return result;
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

    async getPujaMasAlta(productoId) {
        const producto = await this.findById(productoId);
        const pujas = producto.puja;
        let pujaMasAlta = 0;
        if(producto.precioInicial !== undefined){
            pujaMasAlta = producto.precioInicial;
        }
        if(pujas !== undefined){
            for (let i = 0; i < pujas.length; i++) {
                if (pujas[i].cantidad > pujaMasAlta) {
                    pujaMasAlta = pujas[i].cantidad;
                }
            }
        }
        return pujaMasAlta;
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

    async filterProductos(nombre, descripcion, filter = 'Fecha_Desc') {
        if (typeof nombre === 'undefined' && typeof descripcion == 'undefined') {
            const res = await this.findAll().sort({fechaInicio: -1});
            return res;
        } else {
            let res = [];
            switch (String(filter)) {
                case "Activa":
                    res = await Producto.find(
                        {
                            nombre: {
                                '$regex': nombre,
                                '$options': 'i'
                            },

                            descripcion: {
                                '$regex': descripcion,
                                '$options': 'i'
                            },
                            fechaCierre: { $gte : new Date()}
                        }
                    );
                    break;
                case "Finalizada":
                    res =  await Producto.find(
                        {
                            nombre: {
                                '$regex': nombre,
                                '$options': 'i'
                            },

                            descripcion: {
                                '$regex': descripcion,
                                '$options': 'i'
                            },
                            fechaCierre: { $lte : new Date()}
                        }
                    );
                    break;
                case "Precio_Asc":
                    res = await Producto.find(
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
                    ).sort({ precioInicial: 1 });
                    break;
                case "Precio_Desc":
                    res = await Producto.find(
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
                    ).sort({ precioInicial: -1 });
                    break;
                case "Fecha_Asc":
                    res = await Producto.find(
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
                    ).sort({ fechaInicio: 1 });
                    break;
                default:
                    res = await Producto.find(
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
                    ).sort({ fechaInicio: -1 });
                    break;
            }

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
        console.log(imagen)
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

        const res_upload = await uploadImage(res._id, res.imagen)

        return res_upload;
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