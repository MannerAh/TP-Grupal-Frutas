const fs = require('fs')
const http = require('http')


let frutas = []
fs.readFile('./frutas.json', (err, data) => {
  if (err) {
    console.log('Error al leer el archivo JSON: "', err);
  } else {
    console.log(JSON.parse(data));
  }

})
console.log(frutas);
const server = http.createServer((req, res) => {
    const { url } = req
    if (url==='/') {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');  
  } else if (url === 'frutas/all') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(JSON.stringify(frutas));
  } else if (url.startsWith('/frutas/id')) {
    const partes = url.split('/')
    const index = partes[3]
    if (index >= 0 && index < frutas.lenght) {
    const fruta = frutas[index]
    res.writeHead(200, { 'Content-Type': 'application/json'})
    res.end(JSON.stringify(fruta))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify)
    }
  } else if (url.startsWith('/frutas/nombre/')) {
    const partes = url.split('/')
    const nombre = partes[3].toLowerCase()
    const resultados = frutas.filter( fruta =>
    fruta.nombre_frutas.toLowerCase().includes(nombre)
  )
  res.writeHead(200, { 'Content-Type': 'application/json'})
  res.end(JSON.stringify(resultados))
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end(J)
  }
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
});
