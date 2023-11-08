const ServiceUsuario = require('../services/usuarioService');
const serviceUsuario = new ServiceUsuario();

const createUsuarioController = async (req, res, next) => {
    const usuario = req.body
    console.log(usuario)

    if (!usuario){
        return res.status(400).json({
            error: "user no exists"
        })
    }
    const response = await serviceUsuario.createUsuario(usuario)
    console.log(response)

    res.status(response["statusCode"]).json(response["message"])
} 

const getUsuarioByIdController = async (req, res, next) => {
    
    if(req.query.id){
        response = await serviceUsuario.getUsuarioById(req.query.id)
    }else if(req.query.nombre){
        console.log(req.query.nombre)
        response = await serviceUsuario.getUsuarioByNombre(req.query.nombre)
    }/*else if(req.query.valoracion){
        console.log(req.query.valoracion)
        response = await getUsuarioByValoracion(req.query.valoracion)
    }*/else{
        response = await serviceUsuario.getUsuarios()
    }
    res.status(response.statusCode).json(response.message)
}

const deleteUsuarioController = async (req, res, next) => {
    
    const response = await serviceUsuario.deleteUsuario(req.params.id)
    console.log(response)

    res.status(response.statusCode).json(response.message)
    
}

const updateUsuarioController = async (req, res, next) => {
    
    response = await serviceUsuario.updateUsuario(req.query.id, req.query.nombre, req.body.valoracion)
    
    res.status(response.statusCode).json(response.message)
    
}



module.exports = {
    createUsuarioController,
    getUsuarioByIdController,
    deleteUsuarioController,
    updateUsuarioController
}