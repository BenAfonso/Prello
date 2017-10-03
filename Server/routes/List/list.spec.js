const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const List = mongoose.model('List')
const mocha = require('mocha')
const describe = mocha.describe
const beforeEach = mocha.beforeEach
const it = mocha.it
const mockedBoard = { title: 'Test board', visibility: 'public', background: '' }
const mockedList = { name: 'Test list' }

module.exports = (server, chai) => {
  chai.should()
  let board = null
  describe('Lists', () => {
    beforeEach((done) => {
      List.remove({where: {}}).then(() => {
        Board.remove({where: {}}).then(() => {
          Board.create(mockedBoard).then(b => {
            board = b
            done()
          })
        })
      })
    })

    describe('UPDATE /boards/:boardId/lists/:listId', () => {
      it('it should UPDATE a list', done => {
        List.create(mockedList).then(list => {
          chai.request(server)
            .put(`/boards/${board._id}/lists/${list._id}`)
            .send({name: 'Test list updated'})
            .end((err, res) => {
              if (err) return err
              res.should.have.status(200)
              res.body.should.be.a('string')
              List.findById(list._id, (err, res) => {
                if (err) return err
                res.name.should.equal('Test list updated')
                done()
              })
            })
        }).catch(err => {
          console.error('Error mocking test data')
          return err
        })
      })
    })
  })
}
