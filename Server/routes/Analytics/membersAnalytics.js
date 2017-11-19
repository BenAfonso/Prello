const {requiresLogin} = require('../../config/middlewares/authorization')
const request = require('request')
module.exports = function (router, controller) {
  /**
  * @swagger
  * /analytics/boards/{boardId}/members:
  *   get:
  *     tags:
  *       - Analytics
  *     description: Get One board
  *     summary: GET One Boards
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: path
  *         required: true
  *       - name: per
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: query
  *         required: true
  *       - name: from
  *         type: string
  *         format: date
  *         description: The board id where we want to retrieve
  *         in: query
  *       - name: to
  *         type: string
  *         format: date
  *         description: The board id where we want to retrieve
  *         in: query
  *     responses:
  *       200:
  *         description: One board
  *       500:
  *         description: Internal error
  */
  router.get('/analytics/boards/:boardId/members', [requiresLogin], function (req, res) {
    if (req.query.provider === 'ThePrello') {
      if (req.user.theprello !== undefined) {
        request({
          headers: {
            'authorization': `Bearer ${req.user.theprello.accessToken}`
          },
          method: 'get',
          url: `https://theprello-api.igpolytech.fr/api/analytics/boards/${req.params.boardId}/members?per=${req.query.per}${req.query.from ? `&from=${req.query.from}` : ''}${req.query.to ? `&to=${req.query.to}` : ''}`
        }, (error, response) => {
          if (!error && response.statusCode === 200) {
            res.status(200).json(JSON.parse(response.body))
          } else {
            res.status(response.statusCode).json(error)
          }
        })
      } else {
        res.status(401).send('No accessToken for the prello')
      }
    } else {
      controller.getMembersAnalytics(req.params.boardId, req.query.per, req.query.from, req.query.to).then((data) => {
        res.status(200).json(data)
      })
        .catch((err) => {
          res.status(err.status).json(err)
        })
    }
  })
}
