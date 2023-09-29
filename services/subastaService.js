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
    try{
        const subastaFinded = await Subasta.findById(id)
        if(subastaFinded){
            return {statusCode: 200, message: subastaFinded}
        }
    }catch (error) {
        console.error("Error en getSubastaById: ", error);
        return {statusCode: 500, message: {error: error}};
    }
}

const getSubastasByNombre = async (nombreProducto) => {
    try{
        const subastasFinded = await Subasta.find({producto: nombreProducto})
        if(subastasFinded){
            return {statusCode: 200, message: subastasFinded}
        }
    }catch (error) {
        console.log("Error en getSubastaByNombre: ", error)
        return {statusCode: 500, message: {error: error}}
    }
}

const getSubastasByUsuario = async (nombreUsuario) => {
    try{
        const subastasFinded = await Subasta.find({usuario: nombreUsuario})
        if(subastasFinded){
            return {statusCode: 200, message: subastasFinded}
        }
    }catch (error) {
        console.log("Error en getSubastaByUsuario: ", error)
        return {statusCode: 500, message: {error: error}}
    }
}

const getSubastasByPrecio = async (precio) => {
    try{
        const subastasFinded = await Subasta.find({precioActual: precio})
        if(subastasFinded){
            return {statusCode: 200, message: subastasFinded}
        }
    }catch (error) {
        console.log("Error en getSubastaByPrecio: ", error)
        return {statusCode: 500, message: {error: error}}
    }
}

const getSubastas = async () => {
    try{
        const subastasFinded = await Subasta.find({})
        if(subastasFinded){
            return {statusCode: 200, message: subastasFinded}
        }
    }catch (error) {
        console.log("Error en getSubastaByPrecio: ", error)
        return {statusCode: 500, message: {error: error}}
    }
}

module.exports = {
    createSubasta,
    getSubastaById,
    getSubastasByNombre,
    getSubastasByUsuario,
    getSubastasByPrecio,
    getSubastas
};