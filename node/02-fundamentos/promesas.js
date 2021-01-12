let empleados = [{
        id: 1,
        nombre: 'Bryan'
    },
    {
        id: 2,
        nombre: 'Josue'
    },
    {
        id: 3,
        nombre: 'Solares'
    }
]

let salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    }
]

let getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => empleado.id === id);

        if (!empleadoDB) {
            reject(`No existe un empleado con el ID: ${id}`)
        } else {
            resolve(empleadoDB)
        }
    });
}

let getSalario = (empleado) => {
    return new Promise((resolve,reject)=>{
        let empleadoDB = salarios.find(emp => emp.id === empleado.id)

        if(!empleadoDB){
            reject(`No se ha encontrado salario para el empleado: ${empleado.nombre}`)
        }else{
            resolve({nombre: empleado.nombre, salario: empleadoDB.salario, id: empleadoDB.id})
        }
    });
}

/*getEmpleado(1)
    .then(response => {
        console.log(response)
        getSalario(response)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))*/

getEmpleado(1)
.then(empleado =>  getSalario(empleado))
.then(response => console.log(response))
.catch(error => console.log(error) )