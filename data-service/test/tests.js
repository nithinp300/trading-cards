// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Monsters", () => {
  before(function (done) {
    setTimeout(function(){ done();}, 1000);
  });

  describe("GET /monsters", () => {
    // Test to get all monster records
    it("should get all monster records", (done) => {
      chai.request(app)
        .get('/monsters')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

      // Test to get single monster record
      it("should get a single monster record", (done) => {
            const id = 86988864;
            chai.request(app)
                .get(`/monsters/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
  });
});