const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'vehicles.json'));
const port = process.env.PORT || 4000;

// Route API calls to JSON server
app.use('/api/v1', router);

// Serve static files and handle React routing in production.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));