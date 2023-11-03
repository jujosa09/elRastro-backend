const { createUsuario, getUsuarioById, getUsuarioByNombre,getUsuarios, deleteUsuario, updateUsuario} 
= require('../services/usuarioService')
    
    

const createUsuarioController = async (req, res, next) => {
    const usuario = req.body
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
        console.log(req.query.nombre)
        response = await getUsuarioByNombre(req.query.nombre)
    }else{
        response = await getUsuarios()
    }
    res.status(response.statusCode).json(response.message)
}

const deleteUsuarioController = async (req, res, next) => {
    
    const response = await deleteUsuario(req.query.id)
    console.log(response)

    res.status(response.statusCode).json(response.message)
    
}

const updateUsuarioController = async (req, res, next) => {
    
    response = await updateUsuario(req.query.id, req.query.nombre)
    
    res.status(response.statusCode).json(response.message)
    
}



module.exports = {
    createUsuarioController,
    getUsuarioByIdController,
    deleteUsuarioController,
    updateUsuarioController
}