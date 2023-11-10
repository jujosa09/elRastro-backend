const Usuario = require('../db/models/usuario');

const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();

const ServicePuja = require('../services/pujaService');
const servicePuja = new ServicePuja();


class ServiceUsuario {
    constructor() {}

    

    async createUsuario(usuario) {
        try {
            const foundUsuario = await Usuario.find({});
            const existingUsuarios = foundUsuario.map(usuario => usuario.toJSON());
    
            for (const existingUsuario of existingUsuarios) {
                if (existingUsuario['nombre'] === usuario['nombre']) {
                    return "Ya existe un usuario con el mismo nombre";
                }
            }

            const res = await Usuario.create(
                {
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                }
            )


            return res;
        } catch (error) {
            return error;
        }
    }

    async getUsuarioById(id) {
        const foundUsuario = await Usuario.findById(id)
        return foundUsuario;
    }

    async getUsuarioByNombre(nombreUsuario) {
        const foundUsuario = await Usuario.find({ nombre: nombreUsuario })
        return foundUsuario;
    }

    async getUsuarioByCorreo(correo) {
        const foundUsuario = await Usuario.find({ correo: correo })
        return foundUsuario;
    }

    async getUsuarios() {
        const foundUsuario = await Usuario.find()
        return foundUsuario;
    }

    async deleteUsuario(id) {
        const res = await Usuario.findByIdAndDelete(id);
        return res;
    }

    async updateUsuario(id, nombreUsuario, correo) {
        const usuario = await Usuario.findByIdAndUpdate(id, { nombre: nombreUsuario, correo: correo});
        return usuario;
    }

    async valorar(valoracion, usuarioValorado, usuarioValorador, producto){
        const foundValorador = await Usuario.findOne({nombre: usuarioValorador})
        const nuevaValoracion = {
            valorador: foundValorador.nombre,
            puntuacion: valoracion.puntuacion,
            descripcion: valoracion.descripcion,
            producto: producto
        }

        const foundUsuario  = await Usuario.findByIdAndUpdate(usuarioValorado, {$push: {valoracion: nuevaValoracion}});
        return foundUsuario.toJSON();
    }

    async checkValoracion(usuarioValorado, usuarioValorador, producto) {
        const foundValorado = await Usuario.findOne({nombre: usuarioValorado})
        const foundValorador = await Usuario.findOne({nombre: usuarioValorador})
        const foundProducto = await serviceProducto.findById(producto);
        const subastaClosed = await servicePuja.findByProduct(producto);

        if (foundValorado == null) {
            return "El usuario que se quiere valorar no existe";
        } else if (foundValorador == null) {
            return "El usuario que valora no existe";
        } else if (foundProducto == null){
            return "El producto sobre el que se quiere valorar no existe";
        }else if(subastaClosed.fecha >= new Date()){

            const foundValoracion = foundValorado.valoracion.filter((val) => val.producto === producto && val.valorador === foundValorador.nombre);

            if(foundValoracion.length !== 0){
                return "A este usuario ya se le ha valorado por este producto";
            }else if(subastaClosed.nombre !== foundValorador){
                return "El usuario no ha sido el ganador del producto";
            }
            return "ok"
        }else{
            return "La subasta aun no se ha cerrado";
        }
    }
    
}

module.exports = ServiceUsuario;