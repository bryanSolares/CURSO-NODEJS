//Creando web server con node
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  let salida = {
    nombre: 'Bryan Solares',
    edad: 25,
    url: req.url
  }
  res.write(JSON.stringify(salida))
  //res.write('Hola mundo')
  res.end();
}).listen(3000)

console.log('Escuchando el puerto 3000');