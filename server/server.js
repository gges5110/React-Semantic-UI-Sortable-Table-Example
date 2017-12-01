const express = require('express');
const vehiclesData = require('./vehicles.js');
const app = express();
app.use(express.static('static'));

app.get('/api/vehicles', function(req, res) {
  res.json(vehiclesData);
})

app.listen(3000, function () {
  console.log('App started on port 3000');
});