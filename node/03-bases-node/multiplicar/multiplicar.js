const fs = require('fs')


let crearArchivo = (base) => {
    return new Promise((resol, reject) => {

        if (!Number(base)) {
            return reject(`El valor introducido: ${base} no es un número`)
        }

        let data = '';

        for (let i = 1; i <= 10; i++) {
            data += `${base} * ${i} = ${base*i}\n`
        }

        fs.writeFile(`tablas/tabla-${base}.txt`, data, (error) => {
            if (error)
                reject(error);
            else
                resol(`tabla-${base}.txt`)
        })
    });
}

module.exports = {
    crearArchivo
}