const Usuario = require('../db/models/usuario');

async function nextIdUsuario() {
    const ultimoDocumento = await Usuario.findOne({}, {}, { sort: { _id: -1 } });

    let nuevoId = 1; // Valor predeterminado si no hay documentos existentes

    if (ultimoDocumento) {
        nuevoId = ultimoDocumento._id + 1;
    }

    return nuevoId;
}

const createUsuario = async (usuario) => {
    try {
        const usuarioFinded = await Usuario.find({});
        const existedUsuario = usuarioFinded.map(usuario => usuario.toJSON());

        for (const existedUsuario of existedUsuario) {
            if (existedUsuario['nombre'] === usuario['nombre']) {
                return { statusCode: 400, message: { error: "Ya existe una usuario con el mismo nombre" } };
            }
        }
        const id = await nextIdUsuario()
        console.log(id)
        const newUsuario = new Usuario({
            _id: id,
            nombre: usuario.nombre,
            valoracion: usuario.valoracion
        });

        const savedUsuario = await newUsuario.save();
        return { statusCode: 200, message: savedUsuario };
    } catch (error) {
        // Manejo de errores, puedes personalizar según tus necesidades
        console.error("Error en createUsuario:", error);
        return { statusCode: 500, message: { error: error } };
    }
};

const getUsuarioById = async (id) => {
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

const getUsuarioByNombre = async (nombreUsuario) => {
    try {
        const usuarioFinded = await Usuario.find({ usuario: nombreUsuario })
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

const getUsuarios = async () => {
    try {
        const usuarioFinded = await Usuario.find({})
        if (usuarioFinded.length !== 0) {
            return { statusCode: 200, message: usuarioFinded }
        } else {
            return { statusCode: 400, message: "No existen usuarios" }
        }
    } catch (error) {
        console.log("Error en getUsuario: ", error)
        return { statusCode: 500, message: { error: error } }
    }
}

const deleteUsuario = async (usuario) => {
    const usuarioFound = await Usuario.findOneAndDelete({_id: usuario._id})

    if (usuarioFound != null){
        return {codeStatus: 200, message: usuarioFound.toJSON()}
    }else{
        return {codeStatus: 400, message: "El usuario que quiere borrar no existe"}
    }

}

module.exports= {
    createUsuario,
    getUsuarioById,
    getUsuarioByNombre,
    deleteUsuario,
    getUsuarios
};