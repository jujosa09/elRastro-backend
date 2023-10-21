const { cloudinary } = require('../storage');
const Subasta = require('../db/models/subasta');

const uploadImage = async (idSubasta, image) => {
    try {
        const subastaFound = await Subasta.findOne({ _id: idSubasta });
        if (!subastaFound) {
            return { statusCode: 400, message: "No existe la subasta" };
        }

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'SubastaImages' },
                (error, result) => {
                    if (error) {
                        console.error(error);
                        reject({ statusCode: 500, message: "Error al subir imagen a Cloudinary" });
                    } else {
                        subastaFound.image = result.secure_url;
                        subastaFound.save()
                            .then((subasta) => {
                                resolve({ statusCode: 200, message: subasta });
                            })
                            .catch((err) => {
                                console.error(err);
                                reject({ statusCode: 500, message: "Error al guardar la imagen en la subasta" });
                            });
                    }
                }
            ).end(image);
        });

        console.log(result.message);
        return result;
    } catch (error) {
        console.error(error);
        return { statusCode: 500, message: "Error en la carga de la imagen" };
    }
};

module.exports = {
    uploadImage
};
