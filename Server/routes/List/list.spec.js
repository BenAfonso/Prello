const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const List = mongoose.model('List')
const secretKey = require('../../config').secretKey
const jwt = require('jsonwebtoken')
const mockedBoard = { title: 'Test board', visibility: 'private', background: '', owner: '' }
const mockedUser1 = { name: 'Test Test', email: 'test@test.com', password: '1234567', username: 'testUser' }
const mockedUser2 = { name: 'Test2 Test2', email: 'test2@test.com', password: '1234567', username: 'testUser2' }
const mockedUser3 = { name: 'Test3 Test3', email: 'test3@test.com', password: '1234567', username: 'testUser3' }
const mockedList = { name: 'Test list' }

module.exports = (server, chai) => {
  chai.should()
  let board1 = null
  let board2 = null
  let user1 = null
  let user2 = null
  let user3 = null
  let list1 = null
  let list2 = null
  let tokenU1 = null
  let tokenU2 = null
  let tokenU3 = null
  describe('List', () => {
    beforeEach((done) => {
      initData().then(res => {
        user1 = res.user1
        user2 = res.user2
        user3 = res.user3
        board1 = res.board1
        board2 = res.board2
        list1 = res.list1
        list2 = res.list2
        tokenU1 = res.tokenU1
        tokenU2 = res.tokenU2
        tokenU3 = res.tokenU3
        done()
      })
    })

    describe('UPDATE /boards/:boardId/lists/:listId', () => {
      it('it should UPDATE a list', done => {
        chai.request(server)
          .put(`/boards/${board1._id}/lists/${list1._id}`)
          .send({ name: 'Test list updated' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) return err
            res.should.have.status(200)
            res.body.should.be.a('string')
            List.findById(list1._id, (err, res) => {
              if (err) return err
              res.name.should.equal('Test list updated')
              done()
            })
          })
      })
    })
    describe('CREATE /boards/:boardId/lists', () => {
      it('it should CREATE a list', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists`)
          .send({ name: 'Test list' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) console.error(err)
            res.should.have.status(201)
            done()
          })
      })
      it('it should Not CREATE a list (Empty title)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists`)
          .send({ name: '' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) return err
            res.should.have.status(400)
            done()
          })
      })
      it('it should Not CREATE a list (Missing title)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists`)
          .send({})
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) return err
            res.should.have.status(400)
          })
      })
      it('it should Not CREATE a list (Not logged in)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists`)
          .send({ name: 'test' })
          .end((err, res) => {
            if (err) return err
            res.should.have.status(401)
          })
      })
      it('it should Not CREATE a list (Not collaborator)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists`)
          .send({ name: 'Test' })
          .set('authorization', `Bearer ${tokenU3}`)
          .end((err, res) => {
            if (err) return err
            res.should.have.status(403)
          })
      })
      it('it should Not CREATE a list (Public board)', done => {
        chai.request(server)
          .post(`/boards/${board2._id}/lists`)
          .send({ name: 'test' })
          .set('authorization', `Bearer ${tokenU3}`)
          .end((err, res) => {
            if (err) return err
            res.should.have.status(403)
          })
      })
      it('it should CREATE a list (Collaborator)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists`)
          .send({ name: 'Test' })
          .set('authorization', `Bearer ${tokenU2}`)
          .end((err, res) => {
            if (err) return err
            res.should.have.status(201)
          })
      })
    })

  })
}

function initData() {
  return new Promise((resolve, reject) => {
    // User 1 owns board1
    // User 2 is collaborator on board1
    // User 2 owns board2
    // Board2 is public
    // user 1 is logged in
    let board1 = null
    let board2 = null
    let user1 = null
    let user2 = null
    let user3 = null
    let list1 = null
    let list2 = null
    let tokenU1 = null
    let tokenU2 = null
    let tokenU3 = null
    Board.remove({}).then(() => {
      User.remove({}).then(() => {
        User.create(mockedUser1).then(u1 => {
          user1 = u1
          tokenU1 = generateToken(user1)
          User.create(mockedUser2).then(u2 => {
            user2 = u2
            tokenU2 = generateToken(user2)
            List.create(mockedList).then(l1 => {
              list1 = l1
              mockedBoard.owner = user1._i
              mockedBoard.lists = [list1._id]
              mockedBoard.collaborators = [user2._id]
              Board.create(mockedBoard).then(b1 => {
                board1 = b1
                List.create(mockedList).then(l2 => {
                  list2 = l1
                  mockedBoard.owner = u2._id
                  mockedBoard.lists = [l2._id]
                  mockedBoard.visibility = 'public'
                  Board.create(mockedBoard).then(b2 => {
                    board2 = b2
                    User.create(mockedUser3).then(u3 => {
                      user3 = u3
                      tokenU3 = generateToken(user3)
                      resolve({ user1, user2, user3, board1, board2, list1, list2, tokenU1, tokenU2, tokenU3 })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

function generateToken(user) {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '60s' })
}
