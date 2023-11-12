const { cloudinary } = require('../storage');
const Producto = require('../db/models/producto');

const uploadImage = async (productoId, image) => {
    try {
        console.log(productoId)
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return { statusCode: 400, message: "No existe el producto" };
        }

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'ProductoImages' },
                (error, result) => {
                    if (error) {
                        console.error(error);
                        reject({ statusCode: 500, message: "Error al subir imagen a Cloudinary" });
                    } else {
                        producto.imagen = result.secure_url;
                        producto.save()
                            .then((producto) => {
                                resolve({ statusCode: 200, message: producto });
                            })
                            .catch((err) => {
                                console.error(err);
                                reject({ statusCode: 500, message: "Error al guardar la imagen en el producto" });
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