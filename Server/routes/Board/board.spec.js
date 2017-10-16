const mongoose = require('mongoose')
const secretKey = require('../../config').secretKey
const jwt = require('jsonwebtoken')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const mockedBoard = { title: 'Test board', visibility: 'public', background: '', owner: '' }
const mockedUser1 = { name: 'Test Test', email: 'test@test.com', password: '1234567', username: 'testUser' }
const mockedUser2 = { name: 'Test2 Test2', email: 'test2@test.com', password: '1234567', username: 'testUser2' }

module.exports = (server, chai) => {
  chai.should()
  let board1 = null // Board with user1 as owner (no collaborators)
  let board2 = null // Board with user2 as owner (no collaborators)
  let board3 = null // Board with user1 as collaborators
  let user1 = null  // Logged user
  let user2 = null  // Another user
  let token = null  // user1 api token
  describe('Boards', () => {
    beforeEach((done) => {
      initData(mockedUser1, mockedUser2, mockedBoard).then(res => {
        user1 = res.user1
        user2 = res.user2
        board1 = res.board1
        board2 = res.board2
        board3 = res.board3
        token = res.token
        done()
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
      it('it should GET a board (OWNER)', done => {
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
      it('it should GET a board (COLLABORATOR)', done => {
        chai.request(server)
          .get(`/boards/${board3._id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body._id.should.equal(`${board3._id}`)
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
      it('it should not CREATE a board (Unauthenticated 401)', done => {
        chai.request(server)
          .post(`/boards`)
          .send({title: 'TestBoard'})
          .end((err, res) => {
            if (err) {}
            res.should.have.status(401)
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
      it('it should ADD a new collaborator to board (OWNER)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/collaborators`)
          .send({ userId: user2._id })
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(201)
            done()
          })
      })
      it('it should not ADD a new collaborator to board (NOT BOARD OWNER)', done => {
        chai.request(server)
          .post(`/boards/${board2._id}/collaborators`)
          .send({ userId: user2._id })
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(403)
            done()
          })
      })
      /**
       * Missing tests:
       *  It should not add an existing collaborator => 400
       *  It should delete a collaborator (board owner) => 200
       *  It should not delete a collaborator (not board owner) => 403
       *  It should not delete a collaborator (collaborator) => 403
       */
    })
  })
}

function initData (mockedUser1, mockedUser2, mockedBoard) {
  return new Promise((resolve, reject) => {
    let board1, board2, board3, user1, user2 = null
    // User1 owns board1
    // User2 owns board2
    // User1 is collaborator on board3
    Board.remove({}).then(() => {
      User.remove({}).then(() => {
        User.create(mockedUser1).then(u1 => {
          user1 = u1
          token = generateToken(user1)
          User.create(mockedUser2).then(u2 => {
            user2 = u2
            mockedBoard.owner = user1._id
            Board.create(mockedBoard).then(b1 => {
              board1 = b1
              mockedBoard.owner = user2._id
              Board.create(mockedBoard).then(b2 => {
                board2 = b2
                mockedBoard.collaborators = [u1._id]
                Board.create(mockedBoard).then(b3 => {
                  board3 = b3
                  resolve({user1, user2, board1, board2, board3, token})
                }) 
              })
            })
          })
        })
      })
    })
  })
}

function generateToken (user) {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '60s' })
}