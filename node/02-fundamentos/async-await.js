/* 
let getNombre = async()=> {
    //throw new Error('No hay respuesta')
    return 'Bryan Solares';
}
getNombre().then(response => console.log(response)).catch(error=>console.log(error)) */

let getNombre = () => {
    return new Promise((resol, rejec) => {
        setTimeout(() => {
            resol('Bryan Solares')
        }, 3000);
    })
}

let saludo = async () => {
    let nombre = await getNombre()
    return `Hola ${nombre}`
}

saludo()
    .then(nombre => console.log(nombre))
    .catch(error => console.log(error))