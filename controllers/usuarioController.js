const ServiceUsuario = require('../services/usuarioService');
const serviceUsuario = new ServiceUsuario();

const createUsuarioController = async (req, res, next) => {
    const usuario = req.body

    if (!usuario){
        return res.status(400).json({
            error: "user no exists"
        })
    }
    const response = await serviceUsuario.createUsuario(usuario)

    res.status(response["statusCode"]).json(response["message"])
} 

const getUsuarioByIdController = async (req, res, next) => {
    
    if(req.query.id){
        response = await serviceUsuario.getUsuarioById(req.query.id)
    }else if(req.query.nombre){
        response = await serviceUsuario.getUsuarioByNombre(req.query.nombre)
    }else if(req.query.correo){
        response = await serviceUsuario.getUsuarioByCorreo(req.query.correo)
    }else{
        response = await serviceUsuario.getUsuarios()
    }
    res.status(response.statusCode).json(response.message)
}

const deleteUsuarioController = async (req, res, next) => {
    const response = await serviceUsuario.deleteUsuario(req.params.id)

    res.status(response.statusCode).json(response.message)
    
}

const updateUsuarioController = async (req, res, next) => {
    if(req.body.valoracion){
        response = await serviceUsuario.valorarUsuario(req.body.valoracion, req.query.valorado, req.query.valorador, req.query.producto)
    }else{
        response = await serviceUsuario.updateUsuario(req.query.id, req.query.nombre, req.query.correo)
    }
    
    
    
    res.status(response.statusCode).json(response.message)
    
}

const valorarUsuarioController = async (req, res, next) => {
    

    res.status(response.statusCode).json(response.message)
}

module.exports = {
    createUsuarioController,
    getUsuarioByIdController,
    deleteUsuarioController,
    updateUsuarioController,
    valorarUsuarioController
}