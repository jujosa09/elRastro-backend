const axios = require("axios");

class ServiceCarbono {
    constructor() {}

    async getCoordenadasByCodPostal(codPostal) {
        const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+codPostal+'.json?country=es&types=postcode&language=es&access_token='+process.env.MAPBOX_TOKEN+'&limit=1');
        const json = await response.json();
        const coordenadas = json.features[0].geometry.coordinates;
        //console.log(coordenadas)
        return {lat: coordenadas[1].toString(), long: coordenadas[0].toString()};
    }

    async getDistanciaFromCoordinates(coordenadas1, coordenadas2) {
        const options = {
            method: 'GET',
            url: 'https://distance-calculator8.p.rapidapi.com/calc',
            params: {
                startLatitude: coordenadas1.lat,
                startLongitude: coordenadas1.long,
                endLatitude: coordenadas2.lat,
                endLongitude: coordenadas2.long
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'distance-calculator8.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        //console.log(response.data.body.distance.kilometers);
        return response.data.body.distance.kilometers;
    }

    async getHuellaCarbono(userLat, userLong, codPostalProducto) {
        const coordenadasUsuario = {lat: userLat, long: userLong}
        const coordenadasProducto = await this.getCoordenadasByCodPostal(codPostalProducto);

        const distancia = await this.getDistanciaFromCoordinates(coordenadasProducto, coordenadasUsuario);

        const options = {
            method: 'GET',
            url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel',
            params: {
                distance: distancia,
                vehicle: 'MediumDieselCar'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        console.log(response.data);
        return response.data;
    }
}

module.exports = ServiceCarbono;



/*
///////////////////////////////////////////////// CLIMATIQ

           const options = {
            method: 'POST',
            url: 'https://beta4.api.climatiq.io/travel/distance',
            data: {
                'travel_mode': 'car',
                'origin': {
                    'latitude': coordenadasProducto.lat,
                    'longitude': coordenadasProducto.long,
                    'country': 'ES'
                },
                'destination': {
                    'latitude': coordenadasUsuario.lat,
                    'longitude': coordenadasUsuario.long,
                    'country': 'ES'
                }
            },
            headers: {
                'Authorization': 'Bearer ' + process..env.CLIMATIQ_API_KEY
            };
        };


//////////////////////////////////////////// CARBON INTERFACE

        const options = {
            method: 'POST',
            url: 'https://www.carboninterface.com/api/v1/estimates',
            data: {
                'type': 'vehicle',
                'distance_unit': 'km',
                'distance_value': 100,
                'vehicle_model_id': '7268a9b7-17e8-4c8d-acca-57059252afe9'
            },
            headers: {
                'Authorization': 'Bearer ' + process..env.CARBON_INTERFACE_API_KEY,
                'Content-Type': 'application/json'
            }
        }
 */