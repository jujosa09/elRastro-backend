const Subasta = require('../db/models/subasta');

const createSubasta = async (subasta) => {
    try {
        const subastaFinded = await Subasta.find({});
        const existedSubastas = subastaFinded.map(subasta => subasta.toJSON());

        for (const existedSubasta of existedSubastas) {
            if (existedSubasta['usuario'] === subasta['usuario'] && existedSubasta['producto'] === subasta['producto']) {
                return { statusCode: 400, message: { error: "Ya existe una subasta con el mismo nombre" } };
            }
        }

        const newSubasta = new Subasta({
            producto: subasta.producto,
            direccion: subasta.direccion,
            usuario: subasta.usuario,
            precionInicial: subasta.precionInicial,
            fechaCierre: subasta.fechaCierre,
            descripcion: subasta.descripcion,
            precioActual: subasta.precioActual
        });

        const savedSubasta = await newSubasta.save();
        return { statusCode: 200, message: savedSubasta };
    } catch (error) {
        // Manejo de errores, puedes personalizar según tus necesidades
        console.error("Error en createSubasta:", error);
        return { statusCode: 500, message: { error: "Error interno del servidor" } };
    }
};

module.exports = {
    createSubasta
};