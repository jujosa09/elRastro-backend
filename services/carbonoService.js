class ServiceCarbono {
    constructor() {}

    async getCoordenadasByCodPostal(codPostal) {
        const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+codPostal+'.json?country=es&types=postcode&language=es&access_token='+process.env.MAPBOX_TOKEN+'&limit=1');
        const json = await response.json();
        const coordenadas = json.features[0].geometry.coordinates;
        return {lat: coordenadas[1].toString(), long: coordenadas[0].toString()};
    }

}

module.exports = ServiceCarbono;