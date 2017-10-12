const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const List = mongoose.model('List')
const mockedList = { name: 'Test list' }
const mockedBoard = { title: 'Test board' }

module.exports = (server, chai) => {
  chai.should()
  describe('Card', () => {
    beforeEach((done) => {
      List.remove({where: {}}).then(() => {
        Board.remove({where: {}}).then(() => {
          done()
        })
      })
    })

    describe('CREATE /lists/:listId/cards', () => {
      it('it should CREATE a card', done => {
        Board.create(mockedBoard).then(board => {
          List.create(mockedList).then(list => {
            chai.request(server)
              .post(`/boards/${board._id}/lists/${list._id}/cards`)
              .send({text: 'Test card'})
              .end((err, res) => {
                if (err) throw new Error(err)
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body._id.should.be.a('string')
                res.body.text.should.be.a('string')
                res.body.text.should.equal('Test card')
                done()
              })
          }).catch(err => {
            console.error('Error mocking test data')
            return err
          })
        }).catch(err => {
          console.error('Error mocking test data')
          return err
        })
      })
      it('it should NOT CREATE a card (Empty text)', done => {
        Board.create(mockedBoard).then(board => {
          List.create(mockedList).then(list => {
            chai.request(server)
            .post(`/boards/${board._id}/lists/${list._id}/cards`)
            .send({text: ''})
            .end((err, res) => {
              if (err) { }
              res.should.have.status(400)
              done()
            })
          }).catch(err => {
            console.error('Error mocking test data')
            return err
          })
        }).catch(err => {
          console.error('Error mocking test data')
          return err
        })
      })
      it('it should NOT CREATE a card (Missing text in body)', done => {
        Board.create(mockedBoard).then(board => {
          List.create(mockedList).then(list => {
            chai.request(server)
            .post(`/boards/${board._id}/lists/${list._id}/cards`)
            .send({})
            .end((err, res) => {
              if (err) {}
              res.should.have.status(400)
              done()
            })
          }).catch(err => {
            console.error('Error mocking test data')
            return err
          })
        }).catch(err => {
          console.error('Error mocking test data')
          return err
        })
      })
    })
  })
}
