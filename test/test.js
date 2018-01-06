let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

process.env.PORT = 5002;

chai.use(chaiHttp);
let server = require('../server/server');
let agent = chai.request.agent(server.app);

const vehiclesData = require('../server/vehicles.js');
const vehicleConstants = require('../server/vehicleConstants.js');

describe('Basic route testing', () => {
  it('it should GET the index page', (done) => {
    agent
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/api/v1/vehicles', () => {
  it('it should GET the default vehicles', done => {
    agent
    .get('/api/v1/vehicles')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');
      res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      res.body.records.should.have.lengthOf(vehicleConstants.defaultLimit);
      done();
    });
  });

  it('it should GET the vehicles with various limits', done => {
    agent
    .get('/api/v1/vehicles' + '?limit=20')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');
      res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      res.body.records.should.have.lengthOf(20);
      done();
    });
  });

  it('it should GET the vehicles with various limits', done => {
    agent
    .get('/api/v1/vehicles' + '?limit=120')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');
      res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      res.body.records.should.have.lengthOf(100);
      done();
    });
  });

  it('it should GET the vehicles with various limits', done => {
    agent
    .get('/api/v1/vehicles' + '?limit=-1')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');
      res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      res.body.records.should.have.lengthOf(vehicleConstants.defaultLimit);
      done();
    });
  });

  it('it should GET the vehicles with various offsets', done => {
    agent
    .get('/api/v1/vehicles' + '?offset=0')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');
      res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      res.body.records.should.have.lengthOf(vehicleConstants.defaultLimit);
      done();
    });
  });

  it('it should GET the vehicles with various offsets', done => {
    agent
    .get('/api/v1/vehicles' + '?offset=-1')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');
      res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      res.body.records.should.have.lengthOf(vehicleConstants.defaultLimit);

      for (var i = 0; i < vehicleConstants.defaultLimit; ++i) {
        res.body.records[i]._id.should.equal(vehiclesData.data[vehicleConstants.defaultOffset * vehicleConstants.defaultLimit + i]._id);
      }
      done();
    });
  });

  it('it should GET the vehicles with various offsets', done => {
    let offset = 5;
    agent
    .get('/api/v1/vehicles' + '?offset=' + offset)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');
      res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      res.body.records.should.have.lengthOf(vehicleConstants.defaultLimit);

      for (var i = 0; i < vehicleConstants.defaultLimit; ++i) {
        res.body.records[i]._id.should.equal(vehiclesData.data[offset * vehicleConstants.defaultLimit + i]._id);
      }
      done();
    });
  });

  it('it should take different filters', done => {
    agent
    .get('/api/v1/vehicles' + '?filter=1990')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('metadata');
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');

      res.body.records.forEach(record => {
        record.year.should.equal(1990);
      });
      done();
    });
  });

  it('it should not take invalid characters for filter', done => {
    agent
    .get('/api/v1/vehicles' + '?filter=$')
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').which.is.a('string');
      res.body.message.should.equal('Invalid filter: $');
      done();
    });
  });

  it('it should not be able to sort with invalid column', done => {
    agent
    .get('/api/v1/vehicles' + '?sortBy=invalidColumn')
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').which.is.a('string');
      res.body.message.should.equal('Invalid requested sort id. Allowed ids are _id, make, model, year, package, fuelType, transmission, favorite');
      done();
    });
  });

  it('it should be able to sort by year', done => {
    agent
    .get('/api/v1/vehicles' + '?sortBy=year')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');

      for (var i = 0; i < res.body.records.length - 1; ++i) {
        res.body.records[i + 1].year.should.be.least(res.body.records[i].year);
      }
      done();
    });
  });

  it('it should still be able to order with an invalid key', done => {
    agent
    .get('/api/v1/vehicles' + '?order=invalidKey')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');

      for (var i = 0; i < res.body.records.length - 1; ++i) {
        res.body.records[i + 1]._id.should.be.least(res.body.records[i]._id);
      }
      done();
    });
  });

  it('it should be able to order descendingly', done => {
    agent
    .get('/api/v1/vehicles' + '?order=descending')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('records').which.is.an('array');
      res.body.metadata.should.have.property('totalCount').which.is.a('number');

      for (var i = 0; i < res.body.records.length - 1; ++i) {
        res.body.records[i + 1]._id.should.be.most(res.body.records[i]._id);
      }
      done();
    });
  });
});

describe('/api/v1/favorite', () => {
  it('it should not be able to add a vehicle to favorite without passing vehicle object', (done) => {
    agent
    .post('/api/v1/favorite')
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').which.is.a('string');
      res.body.message.should.equal('Invalid request.');
      done();
    });
  });

  it('it should not be able to add a vehicle to favorite with invalid vehicle id', (done) => {
    agent
    .post('/api/v1/favorite')
    .send({
      vehicle: {
        _id: 'someInvalidVehicleID'
      }
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').which.is.a('string');
      res.body.message.should.equal('Invalid requested vehicle id.');
      done();
    });
  });

  it('it should be able to add a vehicle to favorite', (done) => {
    agent
    .post('/api/v1/favorite')
    .send({
      vehicle: vehiclesData.data[0]
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('_id').which.is.a('number');
      res.body.should.have.property('favorite').which.is.a('boolean');
      res.body._id.should.equal(vehiclesData.data[0]._id);
      res.body.favorite.should.equal(true);
      done();
    });
  });

  it('it should be able to toggle back a vehicle from favorite', (done) => {
    agent
    .post('/api/v1/favorite')
    .send({
      vehicle: vehiclesData.data[0]
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('_id').which.is.a('number');
      res.body.should.have.property('favorite').which.is.a('boolean');
      res.body._id.should.equal(vehiclesData.data[0]._id);
      res.body.favorite.should.equal(false);
      done();
    });
  });
});
