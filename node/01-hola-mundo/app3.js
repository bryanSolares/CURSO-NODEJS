console.log('Inicio del programa');

setTimeout(() => {
    console.log('Primer time out');
}, 3000);

setTimeout(() => {
    console.log('Segundo time out');
}, 0);

setTimeout(() => {
    console.log('Tercer time out');
}, 0);

console.log('Fin del programa');