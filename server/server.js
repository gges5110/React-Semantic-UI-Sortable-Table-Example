const express = require('express');
const bodyParser = require('body-parser');

const vehiclesData = require('./vehicles.js');
const vehicleConstants = require('./vehicleConstants.js');

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/v1/vehicles', function(req, res) {
  let sortBy = vehicleConstants.vehicleFieldTypes[0];
  let order = vehicleConstants.orderFieldTypes[0];
  let filter;
  let offset = 0, limit = 10;

  if (req.query.sortBy !== undefined) {
    if (!(vehicleConstants.vehicleFieldTypes.includes(req.query.sortBy)) ) {
      res.status(422).json({
        message: 'Invalid requested sort id. Allowed ids are ' + vehicleConstants.vehicleFieldTypes.join(", ")
      });
      return;
    }
    sortBy = req.query.sortBy;
  }
  if (req.query.order !== undefined) {
    if (!(vehicleConstants.orderFieldTypes.includes(req.query.order))) {
      res.status(422).json({
        message: 'Invalid requested sort order. Allowed sort orders are ' + vehicleConstants.orderFieldTypes.join(", ")
      });
      return;
    }
    order = req.query.order;
  }
  if (req.query.filter !== undefined) {
    filter = req.query.filter;
    filter = filter.toLowerCase();
  }
  if (req.query.offset !== undefined) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit !== undefined) {
    limit = parseInt(req.query.limit);
  }

  // Filter vehiclesData
  var rows = vehiclesData.data.slice();
  var matches = [];
  if (filter !== undefined) {
    for (var i = 0; i < rows.length; ++i) {
      for (var j = 0; j < vehicleConstants.filterableVehicleFieldTypes.length; ++j) {
        var string = rows[i][vehicleConstants.filterableVehicleFieldTypes[j]];
        if (typeof(string) === "number") {
          string = string.toString();
        }

        string = string.toLowerCase();
        if (string.includes(filter)) {
          matches.push(rows[i]);
          break;
        }
      }
    }
  } else {
    matches = rows;
  }

  // Sort vehiclesData
  matches.sort((a, b) => {
    var sortVal = a['_id'] - b['_id'];
    var sign = order === vehicleConstants.orderFieldTypes[0] ? 1 : -1;

    if (a[sortBy] < b[sortBy]) {
      sortVal = -1;
    } else if (a[sortBy] > b[sortBy]) {
      sortVal = 1;
    }
    return sortVal * sign;
  })

  var ret = {
    metadata: {
      totalCount: matches.length
    },
    records: matches.slice(offset * limit, (offset + 1) * limit)
  }
  res.json(ret);
})

app.post('/api/v1/favorite', function(req, res) {
  if (req.body === undefined || req.body.vehicle === undefined) {
    res.status(422).json({ message: 'Invalid request.' });
  } else {
    var i = 0
    for (; i < vehiclesData.data.length; ++i) {
      if (vehiclesData.data[i]._id == req.body.vehicle._id) {
        vehiclesData.data[i].favorite = !vehiclesData.data[i].favorite;
        break;
      }
    }

    if (i === vehiclesData.data.length) {
      res.status(422).json({ message: 'Invalid requested vehicle id.' });
    } else {
      res.json(vehiclesData.data[i]);
    }
  }
})

app.listen(3000, function () {
  console.log('App started on port 3000');
});