const { cloudinary } = require('../storage');
const Producto = require('../db/models/Producto');

const uploadImage = async (productoId, image) => {
    try {
        const producto = await Producto.findById(productoId);
        if (!producto) {
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
                        producto.image = result.secure_url;
                        producto.save()
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