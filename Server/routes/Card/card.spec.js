const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const List = mongoose.model('List')
const Card = mongoose.model('Card')
const secretKey = require('../../config').secretKey
const jwt = require('jsonwebtoken')
const mockedBoard = { title: 'Test board', visibility: 'private', background: '', owner: '' }
const mockedUser1 = { name: 'Test Test', email: 'test@test.com', password: '1234567', username: 'testUser' }
const mockedUser2 = { name: 'Test2 Test2', email: 'test2@test.com', password: '1234567', username: 'testUser2' }
const mockedUser3 = { name: 'Test3 Test3', email: 'test3@test.com', password: '1234567', username: 'testUser3' }
const mockedList = { name: 'Test list' }
const mockedCard = { text: 'Test card' }

module.exports = (server, chai) => {
  chai.should()
  let board1 = null
  let board2 = null
  let list1 = null
  let list2 = null
  let card1 = null
  let card2 = null
  let tokenU1 = null
  let tokenU2 = null
  let tokenU3 = null
  describe('Card', () => {
    beforeEach((done) => {
      initData().then(res => {
        board1 = res.board1
        board2 = res.board2
        list1 = res.list1
        list2 = res.list2
        card1 = res.card1
        card2 = res.card2
        tokenU1 = res.tokenU1
        tokenU2 = res.tokenU2
        tokenU3 = res.tokenU3
        done()
      })
    })
    describe('UPDATE /boards/:boardId/lists/:listId/cards/:cardId', () => {
      it('it should UPDATE a card', done => {
        chai.request(server)
          .put(`/boards/${board1._id}/lists/${list1._id}/cards/${card1._id}`)
          .send({ text: 'Test card updated' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(200)
            res.body.should.be.a('string')
            Card.findById(card1._id, (err, res) => {
              if (err) {}
              res.text.should.equal('Test card updated')
              done()
            })
          })
      })
      it('it should NOT UPDATE a card  (Not logged in)', done => {
        chai.request(server)
          .put(`/boards/${board1._id}/lists/${list1._id}/cards/${card1._id}`)
          .send({ text: 'Test card updated' })
          .end((err, res) => {
            if (err) { }
            res.should.have.status(401)
            done()
          })
      })
      it('it should NOT UPDATE a card  (Not collaborator)', done => {
        chai.request(server)
          .put(`/boards/${board1._id}/lists/${list1._id}/cards/${card1._id}`)
          .send({ text: 'Test card updated' })
          .set('authorization', `Bearer ${tokenU3}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(403)
            done()
          })
      })
      it('it should NOT UPDATE a card  (Public)', done => {
        chai.request(server)
          .put(`/boards/${board2._id}/lists/${list2._id}/cards/${card2._id}`)
          .send({ text: 'Test card updated' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(403)
            done()
          })
      })
    })
    describe('DELETE /boards/:boardId/lists/:listId/cards/:cardId', () => {
      it('it should DELETE a card', done => {
        chai.request(server)
          .delete(`/boards/${board1._id}/lists/${list1._id}/cards/${card1._id}`)
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(200)
            Card.findById(card1._id, (err, res) => {
              if (err) {}
              chai.should().not.exist(res)
              done()
            })
          })
      })
      it('it should NOT DELETE a card  (Not logged in)', done => {
        chai.request(server)
          .delete(`/boards/${board1._id}/lists/${list1._id}/cards/${card1._id}`)
          .send({ text: 'Test card updated' })
          .end((err, res) => {
            if (err) { }
            res.should.have.status(401)
            done()
          })
      })
      it('it should NOT DELETE a card  (Not collaborator)', done => {
        chai.request(server)
          .delete(`/boards/${board1._id}/lists/${list1._id}/cards/${card1._id}`)
          .send({ text: 'Test card updated' })
          .set('authorization', `Bearer ${tokenU3}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(403)
            done()
          })
      })
      it('it should NOT DELETE a card  (Public)', done => {
        chai.request(server)
          .delete(`/boards/${board2._id}/lists/${list2._id}/cards/${card2._id}`)
          .send({ text: 'Test card updated' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(403)
            done()
          })
      })
    })
    describe('CREATE /lists/:listId/cards', () => {
      it('it should CREATE a card', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists/${list1._id}/cards`)
          .send(mockedCard)
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) {}
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body._id.should.be.a('string')
            res.body.text.should.be.a('string')
            res.body.text.should.equal('Test card')
            done()
          })
      })
      it('it should NOT CREATE a card (Empty text)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists/${list1._id}/cards`)
          .send({ text: '' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(400)
            done()
          })
      })
      it('it should NOT CREATE a card (Missing text in body)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists/${list1._id}/cards`)
          .send({})
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(400)
            done()
          })
      })
      it('it should NOT CREATE a card (Not logged in)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists/${list1._id}/cards`)
          .send({ text: 'Test' })
          .end((err, res) => {
            if (err) { }
            res.should.have.status(401)
            done()
          })
      })
      it('it should CREATE a card (collaborator)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists/${list1._id}/cards`)
          .send({ text: 'Test' })
          .set('authorization', `Bearer ${tokenU2}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(201)
            done()
          })
      })
      it('it should NOT CREATE a card (Public board)', done => {
        chai.request(server)
          .post(`/boards/${board2._id}/lists/${list2._id}/cards`)
          .send({ text: 'Test' })
          .set('authorization', `Bearer ${tokenU1}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(403)
            done()
          })
      })
      it('it should NOT CREATE a card (Not collaborator)', done => {
        chai.request(server)
          .post(`/boards/${board1._id}/lists/${list1._id}/cards`)
          .send({ text: 'Test' })
          .set('authorization', `Bearer ${tokenU3}`)
          .end((err, res) => {
            if (err) { }
            res.should.have.status(403)
            done()
          })
      })
    })
  })
}

function initData () {
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
    let card1 = null
    let card2 = null
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
            Card.create(mockedCard).then(c1 => {
              card1 = c1
              List.create(mockedList).then(l1 => {
                list1 = l1
                mockedBoard.owner = user1._id
                mockedBoard.lists = [list1._id]
                mockedBoard.collaborators = [user1._id, user2._id]
                Board.create(mockedBoard).then(b1 => {
                  board1 = b1
                  Card.create(mockedCard).then(c2 => {
                    card2 = c2
                    List.create(mockedList).then(l2 => {
                      list2 = l1
                      mockedBoard.owner = u2._id
                      mockedBoard.lists = [l2._id]
                      mockedBoard.collaborators = [user2._id]
                      mockedBoard.visibility = 'public'
                      Board.create(mockedBoard).then(b2 => {
                        board2 = b2
                        User.create(mockedUser3).then(u3 => {
                          user3 = u3
                          tokenU3 = generateToken(user3)
                          resolve({ user1, user2, user3, board1, board2, list1, list2, card1, card2, tokenU1, tokenU2, tokenU3 })
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
    })
  })
}

function generateToken (user) {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '60s' })
}
