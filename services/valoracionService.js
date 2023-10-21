const Subasta = require('../db/models/subasta')
const Valoracion = require('../db/models/valoracion')

async function nextIdValoracion() {
    const ultimoDocumento = await Valoracion.findOne({}, {}, { sort: { _id: -1 } });
  
    let nuevoId = 1; // Valor predeterminado si no hay documentos existentes
  
    if (ultimoDocumento) {
      nuevoId = ultimoDocumento._id + 1;
    }

    return nuevoId;
}

const createValoracion = async (valoracion) => {
    try{
        const valoracionList = await Valoracion.find({})
        const valoracionesExisted = valoracionList.map(valoracion => valoracion.toJSON())

        for(const valoracionExisted of valoracionesExisted){
            if (valoracionExisted['usuario'] == valoracion['usuario'] && valoracionExisted['usuarioValorado'] == valoracion['usuarioValorado'] && valoracionExisted['idSubasta'] == valoracion['idSubasta']){
                return {statusCode: 400, message: {error: "Ya has valorado a este usuario por la subasta"}}
            }
        }

        const id = await nextIdValoracion()
        const newValoracion = new Valoracion({
            _id: id,
            usuario: valoracion.usuario,
            usuarioValorado: valoracion.usuarioValorado,
            idSubasta: valoracion.idSubasta,
            rating: valoracion.rating
        })

        const savedValoracion = await newValoracion.save()
        //TODO: Necesito el modelo de usuario para insertar la valoracion en su lista de valoraciones

        return {statusCode: 200, message: savedValoracion}
    } catch (error){
        console.log("Error en createValoracion: ", error)
        return {statusCode: 500, message: {error: error}}
    }
}

const deleteValoracion = async (id) => {
    console.log(id)
    const valoracionFound = await Valoracion.findOneAndDelete({_id: id})
    if (valoracionFound != null){
        return {statusCode: 200, message: valoracionFound.toJSON()}
    }else{
        return {statusCode: 400, message: "La valoracion que quiere borrar no existe"}
    }
}

module.exports = {
    createValoracion,
    deleteValoracion
}