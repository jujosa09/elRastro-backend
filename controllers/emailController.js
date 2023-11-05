const {notifyPurchase} = require('../services/emailService')

const notifyPurchaseController = async(req, res, next) => {
    if (!req.body){
        return res.status(400).json({
            error: "bad request"
        })
    }
    
    const producto = req.body.producto
    const comprador = req.body.comprador
    const vendedor = req.body.vendedor

    const response = await notifyPurchase(producto, comprador, vendedor)

    res.status(response["statusCode"]).json(response["message"])

}

module.exports = {
    notifyPurchaseController
}