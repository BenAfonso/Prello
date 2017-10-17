const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

const {boardExists, isCollaborator} = require('../../config/middlewares/boardAuthorizations')
const {listExists} = require('../../config/middlewares/listAuthorizations')

module.exports = (router, controllers) => {
  /**
  * @swagger
  * /boards/{boardId}/lists/{listId}:
  *   delete:
  *     tags:
  *       - Lists
  *     description: Delete a row by his id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         description: The id of the board object where the list is
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *       - name: listId
  *         description: The id of the list object that needs to be deleted
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *     responses:
  *       201:
  *         description: List deleted
  *       500:
  *         description: Internal server error
  *       404:
  *         description: List doesn't exist
  */
  router.delete('/boards/:boardId/lists/:listId', [requiresLogin, boardExists, isCollaborator, listExists], function (req, res) {
    let requiredParameter = ['listId', 'boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controllers.listController.removeList(req).then((data) => {
      res.status(200).send('The list has been deleted')
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
