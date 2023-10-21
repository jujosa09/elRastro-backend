const {uploadImage} = require('../services/imagesService')

const uploadImageController = async (req, res, next) => {
    const image = req.file.buffer
    console.log(image)
    const idSubasta = req.params.id
    if(!image){
        res.status(400).json("No se ha pasado ninguna imagen")
    }

    const response = await uploadImage(idSubasta, image)

    res.status(response.statusCode).json(response.message)

}

module.exports = {
    uploadImageController
}