/* setTimeout(() => {
    console.log('Cumplido');
}, 3000); */

let getUsuarioById = (id,callback) =>{
    let usuario = {
        nombre: 'Bryan',
        id
    }

    if(id === 20){
        callback(`El usuario con id ${id} no existe en la BD`)
    }else{
        callback(null, usuario);
    }

}

getUsuarioById(10,(error, usuario)=>{
    
    if (error) {
        return console.log(error);
    }
    
    console.log(usuario);
});