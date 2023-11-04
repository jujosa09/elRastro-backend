const Subasta = require('../db/models/subasta');

async function nextIdSubasta() {
    const ultimoDocumento = await Subasta.findOne({}, {}, { sort: { _id: -1 } });

    let nuevoId = 1; // Valor predeterminado si no hay documentos existentes

    if (ultimoDocumento) {
        nuevoId = ultimoDocumento._id + 1;
    }

    return nuevoId;
}

const createSubasta = async (subasta) => {
    try {
        const subastaFinded = await Subasta.find({});
        const existedSubastas = subastaFinded.map(subasta => subasta.toJSON());

        for (const existedSubasta of existedSubastas) {
            if (existedSubasta['usuario'] === subasta['usuario'] && existedSubasta['producto'] === subasta['producto']) {
                return { statusCode: 400, message: { error: "Ya existe una subasta con el mismo nombre" } };
            }
        }
        const id = await nextIdSubasta()
        console.log(id)
        const newSubasta = new Subasta({
            _id: id,
            producto: subasta.producto,
            direccion: subasta.direccion,
            usuario: subasta.usuario,
            precionInicial: subasta.precionInicial,
            fechaCierre: subasta.fechaCierre,
            descripcion: subasta.descripcion,
            precioActual: subasta.precioActual,
            puja: {}
        });

        const savedSubasta = await newSubasta.save();
        return { statusCode: 200, message: savedSubasta };
    } catch (error) {
        // Manejo de errores, puedes personalizar según tus necesidades
        console.error("Error en createSubasta:", error);
        return { statusCode: 500, message: { error: error } };
    }
};

const getSubastaById = async (id) => {
    try {
        const subastaFinded = await Subasta.findById(id)
        if (subastaFinded) {
            return { statusCode: 200, message: subastaFinded }
        } else {
            return { statusCode: 400, message: "No existe un objeto con id " + id }
        }
    } catch (error) {
        console.error("Error en getSubastaById: ", error);
        return { statusCode: 500, message: { error: error } };
    }
}

const getSubastasByNombre = async (nombreProducto) => {
    try {
        const subastasFinded = await Subasta.find({ producto: nombreProducto })
        if (subastasFinded.length !== 0) {
            return { statusCode: 200, message: subastasFinded }
        } else {
            return { statusCode: 400, message: "No existe un objeto con nombre " + nombreProducto }
        }
    } catch (error) {
        console.log("Error en getSubastaByNombre: ", error)
        return { statusCode: 500, message: { error: error } }
    }
}

const getSubastasByUsuario = async (nombreUsuario) => {
    try {
        const subastasFinded = await Subasta.find({ usuario: nombreUsuario })
        if (subastasFinded.length !== 0) {
            return { statusCode: 200, message: subastasFinded }
        } else {
            return { statusCode: 400, message: "No existe un objeto con usuario " + nombreUsuario }
        }
    } catch (error) {
        console.log("Error en getSubastaByUsuario: ", error)
        return { statusCode: 500, message: { error: error } }
    }
}

const getCoordByCodPostal = async () => {
    try {
        const https = require('https');

        https.get('https://api.mapbox.com/geocoding/v5/mapbox.places/29011.json?country=es&types=postcode&language=es&access_token=pk.eyJ1IjoibWlndWVsaXRvdGVwcm9ncmFtYSIsImEiOiJjbG9lb3lnZnIwbGl4MmtwbDEzNDN0YmZ1In0.XZ93RHOj4aUAzyjQTn7ykQ', res => {
            let data = [];
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);

            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => {
                console.log('Response ended: ');
                const response = JSON.parse(Buffer.concat(data).toString());
                console.log(response)
                return { statusCode: 200, message: response }
            });
        }).on('error', err => {
            console.log('Error: ', err.message);
        });

    } catch (error) {
        console.log("Error en getCoordByCodPostal: ", error)
        return { statusCode: 500, message: { error: error } }
    }
}

const getSubastasByPrecio = async (precio) => {
    try {
        const subastasFinded = await Subasta.find({ precioActual: precio })
        if (subastasFinded.length !== 0) {
            return { statusCode: 200, message: subastasFinded }
        } else {
            return { statusCode: 400, message: "No existe un objeto con precio " + precio }
        }
    } catch (error) {
        console.log("Error en getSubastaByPrecio: ", error)
        return { statusCode: 500, message: { error: error } }
    }
}

const getSubastas = async () => {
    try {
        const subastasFinded = await Subasta.find({})
        if (subastasFinded.length !== 0) {
            return { statusCode: 200, message: subastasFinded }
        } else {
            return { statusCode: 400, message: "No existen subastas" }
        }
    } catch (error) {
        console.log("Error en getSubasta: ", error)
        return { statusCode: 500, message: { error: error } }
    }
}

const deleteSubasta = async (subasta) => {
    const subastaFound = await Subasta.findOneAndDelete({ _id: subasta._id })

    if (subastaFound != null) {
        return { codeStatus: 200, message: subastaFound.toJSON() }
    } else {
        return { codeStatus: 400, message: "La subasta que quiere borrar no existe" }
    }

}


module.exports = {
    createSubasta,
    getSubastaById,
    getSubastasByNombre,
    getSubastasByUsuario,
    getSubastasByPrecio,
    getSubastas,
    deleteSubasta,
    getCoordByCodPostal
};