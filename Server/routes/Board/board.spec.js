const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const mockedBoard = { title: 'Test board', visibility: 'public', background: '', owner: '' }
const mockedUser1 = { name: 'Test Test', email: 'test@test.com', password: '1234567', username: 'testUser' }
const mockedUser2 = { name: 'Test2 Test2', email: 'test2@test.com', password: '1234567', username: 'testUser2' }

const secretKey = require('../../config').secretKey
const jwt = require('jsonwebtoken')

function generateToken (user) {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '60s' })
}

module.exports = (server, chai) => {
  chai.should()
  let board1 = null
  let board2 = null
  let user1 = null
  let user2 = null
  let token = null
  describe('Boards', () => {
    beforeEach((done) => {
      Board.remove({}).then(() => {
        User.remove({}).then(() => {
          User.create(mockedUser1).then(u1 => {
            user1 = u1
            token = generateToken(user1)
            mockedBoard.owner = user1._id
            Board.create(mockedBoard).then(b1 => {
              board1 = b1
              User.create(mockedUser2).then(u2 => {
                user2 = u2
                mockedBoard.owner = user2._id
                Board.create(mockedBoard).then(b2 => {
                  board2 = b2
                  done()
                })
              })
            })
          })
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
      it('it should GET all boards', done => {
        chai.request(server)
          .get(`/boards`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body.length.should.equal(1)
            res.body[0].should.be.a('object')
            res.body[0]._id.should.equal(`${board1._id}`)
            res.body[0].lists.should.be.a('array')
            res.body[0].lists.length.should.equal(0)
            res.body[0].title.should.equal('Test board')
            done()
          })
      })
      it('it should GET a board', done => {
        chai.request(server)
          .get(`/boards/${board1._id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body._id.should.equal(`${board1._id}`)
            res.body.lists.should.be.a('array')
            res.body.lists.length.should.equal(0)
            res.body.title.should.equal('Test board')
            done()
          })
      })
      it('it shouldn\'t GET a board (NOT OWNER | NOT PUBLIC | NOT COLLABORATOR)', done => {
        chai.request(server)
          .get(`/boards/${board2._id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(403)
            done()
          })
      })
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
      it('it should CREATE a board', done => {
        chai.request(server)
          .post(`/boards`)
          .send({title: 'TestBoard'})
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body.owner.should.equal(`${user1._id}`)
            res.body.title.should.equal('TestBoard')
            done()
          })
      })
      it('it should NOT CREATE a board (Empty title)', done => {
        chai.request(server)
          .post(`/boards`)
          .send({title: ''})
          .set('authorization', `Bearer ${token}`)
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
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(400)
            done()
          })
      })
    })
  })
}
