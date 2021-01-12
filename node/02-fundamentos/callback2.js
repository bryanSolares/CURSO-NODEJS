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


let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id);
    
    if(!empleadoDB){
        callback(`No existe un empleado con el ID: ${id}`)
    }else{
        callback(null, empleadoDB)
        //callback(null, empleadoDB)
    }
}

let getSalario = (empleado, callback)=>{
    let empleadoDB = salarios.find(emp => emp.id === empleado.id)

    if(!empleadoDB){
        callback(`No se ha encontrado salario para el empleado: ${empleado.nombre}`)
    }else{
        callback(null, {nombre: empleado.nombre, salario: empleadoDB.salario, id: empleadoDB.id})
    }
}

getEmpleado(3, (error, empleado)=>{
    
    if (error) 
        return console.log(error);
    

    getSalario(empleado, (error,salarioEmpleado)=>{
        if (error) 
            return console.log(error);
        

        console.log(salarioEmpleado);
    })
})
