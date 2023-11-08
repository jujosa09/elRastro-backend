const Usuario = require('../db/models/usuario');

const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();


class ServiceUsuario {
    constructor() {}

    

    async createUsuario(usuario) {
        try {
            const usuarioFinded = await Usuario.find({});
            const existedUsuarios = usuarioFinded.map(usuario => usuario.toJSON());
    
            for (const existedUsuario of existedUsuarios) {
                if (existedUsuario['nombre'] === usuario['nombre']) {
                    return "Ya existe una usuario con el mismo nombre";
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
        try {
            const foundUsuario = await Usuario.findById(id)
            if (foundUsuario) {
                return foundUsuario;
            } else {
                return "No existe un usuario con id ";
            }
        } catch (error) {
            return error;
        }
    }

    async getUsuarioByNombre(nombreUsuario) {
        try {
            const usuarioFound = await Usuario.find({ nombre: nombreUsuario })
            if (usuarioFound.length !== 0) {
                return usuarioFound;
            } else {
                return "No existe un usuario con nombre " + nombreUsuario;
            }
        } catch (error) {
            return error;
        }
    }

    async getUsuarioByCorreo(correo) {
        try {
            const usuarioFound = await Usuario.find({ correo: correo })
            if (usuarioFound.length !== 0) {
                return usuarioFound;
            } else {
                return "No existe un usuario con correo " + correo;
            }
        } catch (error) {
            return error;
        }
    }

    async getUsuarios() {
        try {
            const usuarioFound = await Usuario.find({})
            if (usuarioFound.length !== 0) {
                return usuarioFound;
            } else {
                return "No existen usuarios";
            }
        } catch (error) {
            return error;
        }
    }

    async deleteUsuario(id) {
        const usuarioFound = await Usuario.findById(id);
        if((await serviceProducto.findByUsuario(usuarioFound.nombre)).length !== 0){
            return "No es posible borrar el usuario porque tiene productos en activo";
        }else{
            const usuarioFound = await Usuario.findOneAndDelete(id);

            if (usuarioFound != null){
                return usuarioFound.toJSON();
            }else{
                return "El usuario que quiere borrar no existe";
            }
        }
        
    
    }

    async updateUsuario(id, nombreUsuario, correo) {
        const foundUsuario = await Usuario.findByIdAndUpdate(id, { nombre: nombreUsuario, correo: correo});
        const usuarioUpdate = await Usuario.findById(id);
        if (foundUsuario != null){
            return usuarioUpdate.toJSON();
        }else{
            return "El usuario que quiere actualizar no existe";
        }
    }

    async valorar(valoracion, usuarioValorado, usuarioValorador, producto){
        const foundValorado = await Usuario.findById(usuarioValorado)
        const foundValorador = await Usuario.findById(usuarioValorador)
        const nuevaValoracion = {
            valorador: foundValorador.nombre,
            puntuacion: valoracion.puntuacion,
            descripcion: valoracion.descripcion,
            producto: producto
        }

        const foundUsuario  = await Usuario.findByIdAndUpdate(usuarioValorado, {$push: {valoracion: nuevaValoracion}});
        return foundUsuario.toJSON();
    }

    async checkValoracion(valoracion, usuarioValorado, usuarioValorador, producto) {
        const foundValorado = await Usuario.findById(usuarioValorado)
        const foundValorador = await Usuario.findById(usuarioValorador)
        const foundProducto = await serviceProducto.findById(producto);

        if (foundValorado == null) {
            return "El usuario que se quiere valorar no existe";
        } else if (foundValorador == null) {
            return "El usuario que valora no existe";
        } else if (foundProducto == null){
            return "El producto sobre el que se quiere valorar no existe";
        }else{

            const foundValoracion = foundValorado.valoracion.filter((val) => val.producto === producto && val.valorador === foundValorador.nombre);

            if(foundValoracion.length !== 0){
                return "A este usuario ya se le ha valorado por este producto";
            }
            return "ok"
        }
    }

}

module.exports = ServiceUsuario;