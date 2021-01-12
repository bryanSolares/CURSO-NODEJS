// let y var hacen lo mismo pero su ambito es diferente

//var puede reasignar valor no importando el bloque donde se ubique
//let no permite usar el mismo nombre de variable

//let es más controlador de scope

let nombre = 'Wolverine'

if (true) {
    //let nombre = 'Magneto'
    nombre = 'Magneto'
}

console.log(nombre);

for (var i = 0; i <= 5; i++) {
    console.log(i);
    
}

console.log(i);