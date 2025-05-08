const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

let frutas = []
fs.readFile('./frutas.json', (err, data) => {
  if (err) {
    console.log('Error al leer el archivo JSON: "', err);
  } else {
    frutas = JSON.parse(data);
    console.log('Archivo JSON leído correctamente: ', JSON.parse(data));
  }

})

// Se crea un servidor HTTP
const server = http.createServer((req, res) => {
// Ruta de la URL
  const path = url.parse(req.url).pathname
  res.setHeader('Content-Type', 'application/json')
    if (path ==='/' || path === '') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');  

    } else if (path === '/frutas/all') {
    res.statusCode = 200;
    res.end(JSON.stringify(frutas));

    } else if (path.startsWith('/frutas/id')) { // Buscar fruta por ID
      const id = path.split('/')[3]
      const frutaId = frutas.find(fruta => fruta.id == id)
      if (frutaId) {
      res.statusCode = 200
      res.end(JSON.stringify(frutaId))
      } else if (isNaN(id)) {
      res.statusCode = 400
      res.end(JSON.stringify({ error: 'Número de ID inválido' }))
      } else {
      res.statusCode = 404
      res.end(JSON.stringify({ error: 'Fruta no encontrada' }));
      }

  } else if (path.startsWith('/frutas/nombre/')) { // Buscar frutas por nombre parcial o completo
    const input = path.split('/')
    const nombre = input[3].toLowerCase()
    const resultados = frutas.filter((fruta) => fruta.nombre.toLowerCase().includes(nombre))
    console.log(nombre);

  
  res.end(JSON.stringify(resultados))

  } else if (path.startsWith('/frutas/existe/')) { // Verificar si existe una fruta por nombre
    const nombre = path.split('/')[3]
    const resultado = frutas.find(fruta => fruta.nombre.toLowerCase() === nombre.toLowerCase()) ? true : false

  res.statusCode = 200
  res.end(JSON.stringify(resultado))
  }
  
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }))
  }
})

// starts a simple http server locally on port 3000
const PUERTO = 3000;
server.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}/`);
  console.log(`Rutas disponibles:`);
  console.log(`- http://localhost:${PUERTO}/`);
  console.log(`- http://localhost:${PUERTO}/frutas/all`);
  console.log(`- http://localhost:${PUERTO}/frutas/id/:id`);
  console.log(`- http://localhost:${PUERTO}/frutas/nombre/:nombre`);
  console.log(`- http://localhost:${PUERTO}/frutas/existe/:nombre`);
});