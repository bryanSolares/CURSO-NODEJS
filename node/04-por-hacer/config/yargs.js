const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion: {
            demand: true,
            alias: 'c',
            desc: 'Descripción de la tarea por hacer'
        }
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Actualiza descripción'
        },
        completado: {
            default: true,
            alias: 'c',
            desc: 'Marca como completado o pendiente la tarea'
        }
    })
    .command('borrar', 'Borra una tarea', {
        descripcion: {
            demand: true,
            alias: 'b',
            desc: 'Actualiza descripción'
        }
    })
    .help()
    .argv;



module.exports = {
    argv
};