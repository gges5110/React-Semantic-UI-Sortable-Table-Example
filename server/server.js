const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'vehicles.json'))
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/v1/*': '/$1'
}))

server.use(router);

server.listen(port);