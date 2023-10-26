const { createUsuario, getUsuarioById, getUsuarioByNombre,getUsuarios, eliminarUsuario, actualizarUsuario} 
= require('../services/usuarioService')
    
    

const createUsuarioController = async (req, res, next) => {
    const Usuario = req.body
    console.log(usuario)

    if (!usuario){
        return res.status(400).json({
            error: "user no exists"
        })
    }
    const response = await createUsuario(usuario)
    console.log(response)

    res.status(response["statusCode"]).json(response["message"])
} 

const getUsuarioByIdController = async (req, res, next) => {
    if(req.query.id){
        response = await getUsuarioById(req.query.id)
    }else if(req.query.nombre){
        response = await getUsuarioByNombre(req.query.nombre)
    }else{
        response = await getUsuarios()
    }
    res.status(response.statusCode).json(response.message)
}

const deleteUsuarioController = async (req, res, next) => {

    response = await eliminarUsuario(req.params.id)
    res.status(response.statusCode).json(response.message)
    
}

const actualizarUsuarioController = async (req, res, next) => {

    response = await actualizarUsuario(req.body)
    res.status(response.statusCode).json(response.message)
    
}



module.exports = {
    createUsuarioController,
    getUsuarioByIdController,
    deleteUsuarioController,
    actualizarUsuarioController
}