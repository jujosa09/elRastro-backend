const { response } = require('express')
const { createValoracion, deleteValoracion } = require('../services/valoracionService')

require('../services/valoracionService')

const createValoracionController = async (req, res, next) => {
    const valoracion = req.body
    console.log(valoracion)

    if (!valoracion){
        return res.status(400).json({
            error: "object no exists"
        })
    }

    const response = await createValoracion(valoracion)
    console.log(response)

    res.status(response['statusCode']).json(response['message'])
}

const deleteValoracionController = async (req, res, next) => {
    const response = await deleteValoracion(req.params.id)
    console.log(response)

    res.status(response.statusCode).json(response.message)
}

module.exports = {
    createValoracionController,
    deleteValoracionController
}