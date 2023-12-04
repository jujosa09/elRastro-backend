const Usuario = require('../db/models/usuario');

const ServiceProducto = require('../services/productoService');
const serviceProducto = new ServiceProducto();

function formatarFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses comienzan desde 0
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
}
class ServiceUsuario {
    constructor() {}

    async createUsuario(usuario) {
        try {
            const foundUsuario = await Usuario.find({});
            const existingUsuarios = foundUsuario.map(usuario => usuario.toJSON());
    
            for (const existingUsuario of existingUsuarios) {
                if (existingUsuario['correo'] === usuario['correo']) {
                    return {message: "Ya existe un usuario con el mismo correo"};
                }
            }

            const res = await Usuario.create(
                {
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                }
            )


            return {message: 'ok', usuario: res};
        } catch (error) {
            return error;
        }
    }

    async getDataFromGoogleToken(token) {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + token);
        const json = await response.json();

        return json;
    }

    async createUsuarioFromGoogle(token) {
        try {
            const json = await this.getDataFromGoogleToken(token);
            const res = await Usuario.create(
                {
                    nombre: json.name,
                    correo: json.email,
                }
            )

            return {status: 200,res: 'Usuario creado con los datos de Google con éxito'};
        } catch (error) {
            return {status: 401, res: error};
        }
    }



    async verifyGoogleToken(googleToken) {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken);
            const json = await response.json();
            if(json.error){
                return {status: 401, res: "El token de sesión no es válido"}
            }else{
                return {status: 200, res: "valido"};
            }

        }
        catch (error) {
            console.error('Error al verificar el token de Google:', error);
            return {status: 401, res: "token no valido"};
        }
    }


    async getUsuarioByNombre(nombreUsuario) {
        const foundUsuario = await Usuario.findOne({ nombre: nombreUsuario })
        return foundUsuario;
    }

    async getUsuarioByCorreo(correo) {
        const foundUsuario = await Usuario.findOne({ correo: correo })
        return foundUsuario;
    }

    async getUsuarios() {
        const foundUsuario = await Usuario.find()
        return foundUsuario;
    }

    async deleteUsuario(correo) {
        const producto = await serviceProducto.findByUsuario(correo)
        if(producto.length !== 0){
            return {status: 409, res: "El usuario " + correo + " tiene productos y no se puede borrar"};
        }else{
            const res = await Usuario.deleteOne({correo: correo});
            return {status: 200, res: res};
        }
    }

    async updateUsuario(correo, nombreUsuario) {
        const usuario = await Usuario.findOneAndUpdate({correo: correo}, { nombre: nombreUsuario },
            { new: true });

        return usuario;
    }

    async valorar(valoracion, usuarioValorado, usuarioValorador, producto){
        const foundValorador = await Usuario.findOne({correo: usuarioValorador})
        const nuevaValoracion = {
            valorador: foundValorador.correo,
            puntuacion: valoracion.puntuacion,
            descripcion: valoracion.descripcion,
            producto: producto
        }

        const foundUsuario  = await Usuario.findOneAndUpdate({correo: usuarioValorado}, {$push: {valoracion: nuevaValoracion}},
            { new: true });
        return foundUsuario.toJSON();
    }

    async getValoracionMedia(correo){
        const foundUsuario = await Usuario.findOne({correo: correo});

        const sumaPuntuaciones = foundUsuario.valoracion.reduce((total, val) => {
            return total + val.puntuacion;
          }, 0);

        const cantidadValoraciones = foundUsuario.valoracion.length;
        const mediaPuntuaciones = cantidadValoraciones > 0 ? sumaPuntuaciones / cantidadValoraciones : 0;
      
        return mediaPuntuaciones.toJSON();

    }

    async getValoracion(correo){
        const foundUsuario = await Usuario.findOne({correo: correo});
        console.log(foundUsuario)
        const valoraciones = foundUsuario.valoracion;

        return valoraciones;

    }

    async checkValoracion(usuarioValorado, usuarioValorador, producto) {
        const foundValorado = await Usuario.findOne({correo: usuarioValorado})
        const foundValorador = await Usuario.findOne({correo: usuarioValorador})
        const foundProducto = await serviceProducto.findById(producto);
        const subastaClosed = foundProducto.puja;
        const currentDate = new Date();
        //const formatedDate = formatarFecha(currentDate)

        if (typeof foundValorado === 'undefined' || !foundValorado) {
            return "El usuario que se quiere valorar no existe";
        } else if (typeof foundValorador === 'undefined' || !foundValorador) {
            return "El usuario que valora no existe";
        } else if (typeof foundProducto === 'undefined' || !foundProducto){
            return "El producto sobre el que se quiere valorar no existe";
        }else if(foundProducto.fechaCierre < currentDate){

            const foundValoracion = foundValorado.valoracion.filter((val) => val.producto === producto && val.valorador === foundValorador.correo);
            console.log(subastaClosed.usuario)
            if(foundValoracion.length !== 0){
                return "A este usuario ya se le ha valorado por este producto";
            }else if(subastaClosed.usuario !== foundValorador.correo){
                return "El usuario no ha sido el ganador del producto";
            }
            return "ok"
        }else{
            return "La subasta aun no se ha cerrado";
        }
    }
    
}

module.exports = ServiceUsuario;