const {Producto} = require('../db/models/producto');
const axios = require('axios');

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
            const producto = await this.findById(pujas[i].producto);
            productosByPujas.push({producto: producto, puja: pujas[i]});
        }
        return productosByPujas;
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

    async getCoordenadasByCodPostal(codPostal) {
        const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+codPostal+'.json?country=es&types=postcode&language=es&access_token=pk.eyJ1IjoibWlndWVsaXRvdGVwcm9ncmFtYSIsImEiOiJjbG9lb3lnZnIwbGl4MmtwbDEzNDN0YmZ1In0.XZ93RHOj4aUAzyjQTn7ykQ&limit=1');
        const json = await response.json();
        const coordenadas = json.features[0].geometry.coordinates;
        return {lat: coordenadas[0].toString(), long: coordenadas[1].toString()};
    }

    /*async getDistanciaByCoordenadas(codPostalProducto, codPostalusuario) {
        const coordenadasProducto = await this.getCoordenadasByCodPostal(codPostalProducto);
        const coordenadasUsuario = await this.getCoordenadasByCodPostal(codPostalusuario);

        const options = {
            method: 'GET',
            url: 'https://distance-calculator.p.rapidapi.com/distance/simple',
            params: {
                lat_1: coordenadasProducto.lat,
                long_1: coordenadasProducto.long,
                lat_2: coordenadasUsuario.lat,
                long_2: coordenadasUsuario.long,
                unit: 'kilometers',
                decimal_places: '2'
            },
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'distance-calculator.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        console.log(response.data);
    }*/
}

module.exports = ServiceProducto;