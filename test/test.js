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
