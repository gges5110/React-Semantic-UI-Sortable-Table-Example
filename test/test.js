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
      // res.body.metadata.totalCount.should.equal(vehiclesData.data.length);
      // res.body.records.should.have.lengthOf(vehicleConstants.defaultLimit);
      done();
    });
  })
});
