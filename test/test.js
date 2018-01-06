let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

process.env.PORT = 5002;

chai.use(chaiHttp);
var server = require('../server/server');

describe('Basic route testing', () => {
  it('it should GET the index page', (done) => {
    chai.request(server.app)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
