const {uploadImage} = require('../services/imageService')

const uploadImageController = async (req, res) => {
    const image = req.file.buffer
    console.log(image)
    if(!image){
        res.status(400).json("No se ha pasado ninguna imagen")
    }

    const response = await uploadImage(req.params.id, image)

    res.status(response.statusCode).json(response.message)

}

module.exports = {
    uploadImageController
}