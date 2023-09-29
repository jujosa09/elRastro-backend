const { createSubasta, getSubastaById, getSubastasByNombre, 
getSubastasByUsuario, getSubastasByPrecio, getSubastas} = require('../services/subastaService')


const createSubastaController = async (req, res, next) => {
    const subasta = req.body
    console.log(subasta)

    if (!subasta){
        return res.status(400).json({
            error: "object no exists"
        })
    }
    const response = await createSubasta(subasta)
    console.log(response)

    res.status(response["statusCode"]).json(response["message"])
}

const getSubastaByIdController = async (req, res, next) => {
    if(req.query.id){
        response = await getSubastaById(req.query.id)
    }else if(req.query.nombre){
        response = await getSubastasByNombre(req.query.nombre)
    }else if(req.query.precio){
        response = await getSubastasByPrecio(req.query.precio)
    }else if(req.query.usuario){
        response = await getSubastasByUsuario(req.query.usuario)
    }else{
        response = await getSubastas()
    }
    res.status(response.statusCode).json(response.message)
}


module.exports = {
    createSubastaController,
    getSubastaByIdController
}