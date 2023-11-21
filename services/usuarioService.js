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
                if (existingUsuario['nombre'] === usuario['nombre']) {
                    return {message: "Ya existe un usuario con el mismo nombre"};
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

    async getUsuarioById(id) {
        const foundUsuario = await Usuario.findById(id)
        return foundUsuario;
    }

    async getUsuarioByNombre(nombreUsuario) {
        const foundUsuario = await Usuario.find({ nombre: nombreUsuario })
        return foundUsuario;
    }

    async getUsuarioByCorreo(correo) {
        const foundUsuario = await Usuario.find({ correo: correo })
        return foundUsuario;
    }

    async getUsuarios() {
        const foundUsuario = await Usuario.find()
        return foundUsuario;
    }

    async deleteUsuario(id) {
        const producto = await serviceProducto.findByUsuario(id)
        if(producto.length !== 0){
            return {status: 409, res: "El usuario " + id + " tiene productos y no se puede borrar"};
        }else{
            const res = await Usuario.findByIdAndDelete(id);
            return {status: 200, res: res};
        }
    }

    async updateUsuario(id, nombreUsuario, correo) {
        const usuario = await Usuario.findByIdAndUpdate(id, { nombre: nombreUsuario, correo: correo},
            { new: true });

        return usuario;
    }

    async valorar(valoracion, usuarioValorado, usuarioValorador, producto){
        const foundValorador = await Usuario.findOne({nombre: usuarioValorador})
        const nuevaValoracion = {
            valorador: foundValorador.nombre,
            puntuacion: valoracion.puntuacion,
            descripcion: valoracion.descripcion,
            producto: producto
        }

        const foundUsuario  = await Usuario.findByIdAndUpdate(usuarioValorado, {$push: {valoracion: nuevaValoracion}},
            { new: true });
        return foundUsuario.toJSON();
    }

    async getValoracionMedia(idUsuario){
        const foundUsuario = await Usuario.findById(idUsuario);

        const sumaPuntuaciones = foundUsuairo.valoracion.reduce((total, val) => {
            return total + val.puntuacion;
          }, 0);

        const cantidadValoraciones = foundUsuario.valoracion.length;
        const mediaPuntuaciones = cantidadValoraciones > 0 ? sumaPuntuaciones / cantidadValoraciones : 0;

        return mediaPuntuaciones.toJSON();

    }

    

    async checkValoracion(usuarioValorado, usuarioValorador, producto) {
        const foundValorado = await Usuario.findById(usuarioValorado)
        const foundValorador = await Usuario.findOne({nombre: usuarioValorador})
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

            const foundValoracion = foundValorado.valoracion.filter((val) => val.producto === producto && val.valorador === foundValorador.nombre);

            if(foundValoracion.length !== 0){
                return "A este usuario ya se le ha valorado por este producto";
            }else if(subastaClosed.usuario !== foundValorador.id){
                return "El usuario no ha sido el ganador del producto";
            }
            return "ok"
        }else{
            return "La subasta aun no se ha cerrado";
        }
    }
    
}

module.exports = ServiceUsuario;