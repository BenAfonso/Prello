const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const mockedBoard = { title: 'Test board', visibility: 'public', background: '' }

module.exports = (server, chai) => {
  chai.should()
  // let board = null
  describe('Boards', () => {
    beforeEach((done) => {
      Board.remove({}).then(() => {
        Board.create(mockedBoard).then(b => {
          // board = b
          done()
        })
      })
    })

    describe('GET /boards', () => {
      it('it shouldn\'t GET all boards (not authenticated)', done => {
        chai.request(server)
          .get(`/boards`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(401)
            done()
          })
      })
      /* it('it should GET all boards', done => {
        chai.request(server)
          .get(`/boards`)
          .end((err, res) => {
            if (err) throw new Error(err)
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body.length.should.equal(1)
            res.body[0].should.be.a('object')
            res.body[0]._id.should.equal(`${board._id}`)
            res.body[0].lists.should.be.a('array')
            res.body[0].lists.length.should.equal(0)
            res.body[0].title.should.equal('Test board')
            done()
          })
      }) */
     /* it('it should GET a board', done => {
        chai.request(server)
          .get(`/boards/${board._id}`)
          .end((err, res) => {
            if (err) throw new Error(err)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body._id.should.equal(`${board._id}`)
            res.body.lists.should.be.a('array')
            res.body.lists.length.should.equal(0)
            res.body.title.should.equal('Test board')
            done()
          })
      }) */
      it('it should not GET a board (wrong id) 404', done => {
        chai.request(server)
          .get(`/boards/59d62fd216575b11bb8320a5`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(404)
            done()
          })
      })
    })
    describe('CREATE /boards', () => {
     /* it('it should CREATE a board', done => {
        chai.request(server)
          .post(`/boards`)
          .send({title: 'TestBoard'})
          .end((err, res) => {
            if (err) throw new Error(err)
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body.title.should.equal('TestBoard')
            done()
          })
      })
      it('it should NOT CREATE a board (Empty title)', done => {
        chai.request(server)
          .post(`/boards`)
          .send({title: ''})
          .end((err, res) => {
            if (err) {}
            res.should.have.status(400)
            done()
          })
      })
      it('it should NOT CREATE a board (Missing title)', done => {
        chai.request(server)
          .post(`/boards`)
          .send({})
          .end((err, res) => {
            if (err) {}
            res.should.have.status(400)
            done()
          })
      }) */
    })
  })
}
