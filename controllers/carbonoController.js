const ServiceCarbono = require('../services/carbonoService');
const serviceCarbono = new ServiceCarbono();

const getCoordinatesFromPostalCode = async (req, res, next) => {
    const coordenadas = await serviceCarbono.getCoordenadasByCodPostal(req.body.codPostal)
    res.status(200).json(coordenadas)
}

module.exports = {getCoordinatesFromPostalCode}