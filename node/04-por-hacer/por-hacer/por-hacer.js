const fs = require('fs')

let listadoPorHacer = []

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    });
}

const listaDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    listaDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer)
    guardarDB()
    return porHacer;
}

const getListado = () => {
    listaDB();
    return listadoPorHacer;
}

const actualizar = (desc, completado = true) => {
    listaDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === desc)

    if (index => 0) {
        listadoPorHacer[index].completado = completado
        guardarDB()
        return true
    }else{
        return false
    }
}

const borrar = (desc) =>{
    listaDB();
    let nuevoListado = listadoPorHacer.filter(tarea => !tarea.descripcion === desc);
    
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    
}

module.exports = {
    crear,
    listaDB,
    getListado,
    actualizar,
    borrar
}