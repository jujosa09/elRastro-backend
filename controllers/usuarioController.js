const ServiceUsuario = require('../services/usuarioService');
const serviceUsuario = new ServiceUsuario();

const createUsuarioController = async (req, res, next) => {


    if (!req.body){
        return res.status(400).json({
            error: "user no exists"
        })
    }
    try{
        const usuario = await serviceUsuario.createUsuario(req.body)
        res.status(200).send({message: "Usuario " + usuario.id + " creado con éxito", usuario: usuario});
    }catch (error) {
        res.status(500).send({success: false, message: error.message});
    }

} 

const getUsuarioByIdController = async (req, res, next) => {
    
    try{
        if(req.query.id){
            response = await serviceUsuario.getUsuarioById(req.query.id)
        }else if(req.query.nombre){
            response = await serviceUsuario.getUsuarioByNombre(req.query.nombre)
        }else if(req.query.correo){
            response = await serviceUsuario.getUsuarioByCorreo(req.query.correo)
        }else{
            response = await serviceUsuario.getUsuarios()
        }

        res.status(200).send({usuario: response});
    
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}

const deleteUsuarioController = async (req, res, next) => {
   try{
        const response = await serviceUsuario.deleteUsuario(req.params.id)

        res.status(200).send({usuario: response});
   }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
    
}

const updateUsuarioController = async (req, res, next) => {
    try{
        if(req.body.valoracion){
            response = await serviceUsuario.valorarUsuario(req.body.valoracion, req.query.valorado, req.query.valorador, req.query.producto)
        }else{
            response = await serviceUsuario.updateUsuario(req.query.id, req.query.nombre, req.query.correo)
        }

        res.status(200).send({usuario: response});
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
    
}

module.exports = {
    createUsuarioController,
    getUsuarioByIdController,
    deleteUsuarioController,
    updateUsuarioController
}