// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * /boards/{boardId}/attachments:
    *   get:
    *     tags:
    *       - Attachments
    *     description: Get all attachment in a board
    *     summary: Get all attachment in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to get all the attachment
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: All the attachments
    *         schema:
    *           $ref: '#/definitions/Attachment'
    *       500:
    *         description: Internal error
    */
  router.get('/boards/:boardId/attachments', [requiresLogin, isCollaborator], (req, res) => {
    res.status(200).send('Not implemented yet')
  })
}
