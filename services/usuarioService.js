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
            const foundUsuario = await Usuario.findById(id)
            if (foundUsuario) {
                return { statusCode: 200, message: foundUsuario }
            } else {
                return { statusCode: 404, message: "No existe un usuario con id " + id }
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

    async getUsuarioByCorreo(correo) {
        try {
            const usuarioFinded = await Usuario.find({ correo: correo })
            if (usuarioFinded.length !== 0) {
                return { statusCode: 200, message: usuarioFinded }
            } else {
                return { statusCode: 400, message: "No existe un usuario con correo " + correo }
            }
        } catch (error) {
            console.log("Error en getUsuarioByCorreo: ", error)
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
            return { statusCode: 400, message: "No es posible borrar el usuario porque tiene productos en activo" }
        }else{
            const usuarioFound = await Usuario.findOneAndDelete(id);

            if (usuarioFound != null){
                return {statusCode: 200, message: usuarioFound.toJSON()}
            }else{
                return {statusCode: 400, message: "El usuario que quiere borrar no existe"}
            }
        }
        
    
    }

    async updateUsuario(id, nombreUsuario, correo) {
        const usuarioFound = await Usuario.findByIdAndUpdate(id, { nombre: nombreUsuario, correo: correo});
        const usuarioUpdate = await Usuario.findById(id);
        if (usuarioFound != null){
            return {statusCode: 200, message: usuarioUpdate.toJSON()}
        }else{
            return {statusCode: 400, message: "El usuario que quiere actualizar no existe"}
        }
    }

    async valorarUsuario(valoracion, usuarioValorado, usuarioValorador, producto) {
        const foundValorado = await Usuario.find({nombre: usuarioValorado})
        const foundValorador = await Usuario.find({nombre: usuarioValorador})
        const foundProducto = await serviceProducto.findById(producto);

        if (foundValorado == null) {
            return {statusCode: 404, message: "El usuario que se quiere valorar no existe"}
        } else if (foundValorador == null) {
            return {statusCode: 404, message: "El usuario que valora no existe"}
        } else if (foundProducto == null){
            return {statusCOde: 404, message: "El producto sobre el que se quiere valorar no existe"}
        }else{

            const nuevaValoracion = {
                    valorador: foundValorador[0].nombre,
                    rating: valoracion.rating,
                    descripcion: valoracion.descripcion,
                    producto: foundProducto.id
            }
            
            const usuarioEncontrado = foundValorado[0].valoracion.filter((valoracion) => valoracion.producto === foundProducto.id);

            if(usuarioEncontrado.length !== 0){
                return {statusCode: 404, message: "A este usuario ya se le ha valorado por este producto"}
            }else{
                const usuarioFound  = await Usuario.findByIdAndUpdate(foundValorado[0].id, {$push: {valoracion: nuevaValoracion}});
                const usuarioValorado = await Usuario.findById(foundValorado[0].id);
                if (usuarioValorado != null){
                    return {statusCode: 200, message: usuarioValorado.toJSON()}
                }else{
                    return {statusCode: 400, message: "La valoración que quiere hacer no es posible"}
                }
            }
           

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