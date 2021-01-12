const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar'/*, {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
    }*/)
    .help()
    .argv()
const {
    crearArchivo
} = require('./multiplicar/multiplicar')

//console.log(argv);


//let parametro = argv[2];
//let base = parametro.split('=')[1];

/*crearArchivo(base)
.then(console.log)
.catch(console.log)*/

//console.log(module);
//console.log(process.argv);