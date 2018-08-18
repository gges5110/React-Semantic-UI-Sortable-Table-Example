const express = require('express');
const jsonServer = require('json-server');
// const server = jsonServer.create();
const server = express();
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'vehicles.json'))
// const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use('/api/v1', router);

// server.use(middlewares);
server.use(express.static(path.join(__dirname, '/../static/')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../static/index.html'));
});

// Add this before server.use(router)
// server.use(jsonServer.rewriter({
//   '/api/v1/*': '/$1'
// }))

server.listen(port);