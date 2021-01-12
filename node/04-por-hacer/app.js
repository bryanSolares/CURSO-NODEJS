//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer')
const color = require('colors')

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion)
        console.log(tarea);
        break;

    case 'listar':
        let tareas = porHacer.getListado()
        for (const tarea of tareas) {
            console.log('==== POR HACER ===='.green);
            console.log(tarea.descripcion);
            console.log('Estado:',tarea.completado);
            console.log('==================='.green);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion,argv.complentado)
        break;

        case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);

    default:
        console.log('Comando no es reconocido');
}