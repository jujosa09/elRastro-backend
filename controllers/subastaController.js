const { createSubasta } = require('../services/subastaService')


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

module.exports = {
    createSubastaController
}