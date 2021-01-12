const options = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
}

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de mulplicar de acuerdo a la base indicada', {
        options
    })
    .command('crear', 'Generar un archivo con la tabla de multiplicar de acuerdo a la base indicada', {
        options
    })
    .help()
    .argv;

module.exports = {
    argv
}