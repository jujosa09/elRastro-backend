const { createUsuario, getUsuarioById, getUsuarioByNombre,deleteUsuario,getUsuarios} 
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



module.exports = {
    createUsuarioController,
    //getSubastaByIdController,
    //deleteSubastaController,
    //actualizarSubastaController
}