let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre: function(){
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`
    }
}

console.log(deadpool.getNombre);

let {nombre: primerNombre, apellido: primerApellido, poder} = deadpool;

console.log(primerNombre,primerApellido,poder);