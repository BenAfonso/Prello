const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{id}/labels/{labelId}:
    *   put:
    *     tags:
    *       - Labels
    *     description: Update a Label inside a board
    *     summary: UPDATE a new Label inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         type: string
    *         description: The board id where we want to update the label
    *         in: path
    *         required: true
    *       - name: labelId
    *         type: string
    *         description: The label id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Label object to update
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/Label'
    *     responses:
    *       200:
    *         description: Message confirming the Label has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/labels/:labelId', [requiresLogin, isCollaborator], function (req, res) {
    let requiredParameter = ['labelId', 'boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.updateLabel(req).then((data) => {
      res.status(200).json('Successfully updated')
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
