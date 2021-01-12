function sumar(a,b){
    return a + b;
}
console.log(sumar(10,20))

let sumar2 = (a,b)=> a+b
console.log(sumar2(10,20));

let saludar = () => 'Hola mundo'

console.log(saludar());

let saludar2 = nombre => `Hola ${nombre}`
console.log(saludar2('Bryan'));