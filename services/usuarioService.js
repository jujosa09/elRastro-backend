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
                    return { statusCode: 400, message: { error: "Ya existe una usuario con el mismo nombre" } };
                }
            }

            const res = await Usuario.create(
                {
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    valoracion: {}
                }
            )


            return { statusCode: 200, message: res };
        } catch (error) {
            // Manejo de errores, puedes personalizar según tus necesidades
            console.error("Error en createUsuario:", error);
            return { statusCode: 500, message: { error: error } };
        }
    }

    async getUsuarioById(id) {
        try {
            const usuarioFinded = await Usuario.findById(id)
            if (usuarioFinded) {
                return { statusCode: 200, message: usuarioFinded }
            } else {
                return { statusCode: 400, message: "No existe un usuario con id " + id }
            }
        } catch (error) {
            console.error("Error en getUsuarioById: ", error);
            return { statusCode: 500, message: { error: error } };
        }
    }

    async getUsuarioByNombre(nombreUsuario) {
        try {
            const usuarioFinded = await Usuario.find({ nombre: nombreUsuario })
            if (usuarioFinded.length !== 0) {
                return { statusCode: 200, message: usuarioFinded }
            } else {
                return { statusCode: 400, message: "No existe un usuario con nombre " + nombreUsuario }
            }
        } catch (error) {
            console.log("Error en getUsuarioByNombre: ", error)
            return { statusCode: 500, message: { error: error } }
        }
    }

    async getUsuarios() {
        try {
            const usuarioFinded = await Usuario.find({})
            if (usuarioFinded.length !== 0) {
                return { statusCode: 200, message: usuarioFinded }
            } else {
                return { statusCode: 204, message: "No existen usuarios" }
            }
        } catch (error) {
            console.log("Error en getUsuario: ", error)
            return { statusCode: 500, message: { error: error } }
        }
    }

    async deleteUsuario(id) {
        const usuarioFound = await Usuario.findById(id);
        if((await serviceProducto.findByUsuario(usuarioFound.nombre)).length !== 0){
            return { statusCode: 400, message: "Tienes productos en activo" }
        }else{
            const usuarioFound = await Usuario.findOneAndDelete(id);

            if (usuarioFound != null){
                return {statusCode: 200, message: usuarioFound.toJSON()}
            }else{
                return {statusCode: 400, message: "El usuario que quiere borrar no existe"}
            }
        }
        
    
    }
    
    async updateUsuario(id, nombreUsuario, valoracion) {
        const usuarioFound = await Usuario.findByIdAndUpdate(id, { nombre: nombreUsuario, valoracion: valoracion });
        const usuarioUpdate = await Usuario.findById(id);
        console.log(usuarioUpdate)
        if (usuarioFound != null){
            return {statusCode: 200, message: usuarioUpdate.toJSON()}
        }else{
            return {statusCode: 400, message: "El usuario que quiere actualizar no existe"}
        }
    }

}









/*const getUsuarioByValoracion = async (valoracion) => {
    try{
        const valoracionFound = await Valoracion.find({rating: valoracion})
        if(valoracionFound.length !== 0){
            return { statusCode: 200, message: valoracionFound.usuario}
        }else {
            return { statusCode: 400, message: "No existe un usuario con valoracion " + valoracion }
        }
    } catch (error) {
        console.log("Error en getUsuarioByValoracion: ", error)
        return { statusCode: 500, message: { error: error } }
    }
    
}*/





module.exports = ServiceUsuario;