const {requiresLogin} = require('../../config/middlewares/authorization')
const request = require('request')

module.exports = function (router, controller) {
  /**
  * @swagger
  * /analytics/boards:
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
  *       - name: userId
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: One board
  *       500:
  *         description: Internal error
  */
  router.get('/analytics/boards/', [requiresLogin], function (req, res) {
    controller.getAllUserBoards(req.user._id).then((data) => {
      if (req.user.theprello !== undefined) {
        request({
          headers: {
            'authorization': `Bearer ${req.user.theprello.accessToken}`
          },
          method: 'get',
          url: 'https://theprello-api.igpolytech.fr/api/analytics/boards',
          form: data
        }, (error, response) => {
          if (!error && response.statusCode === 200) {
            let boardsDist = JSON.parse(response.body)
            boardsDist.map(boardDist => {
              if (!boardDist.createdAt) {
                boardDist.createdAt = '11-01-2017'
              }
              data.push({provider: 'ThePrello', title: boardDist.name, _id: boardDist._id, createdAt: boardDist.createdAt})
            })
            res.status(200).json(data)
          } else {
            res.status(200).json(data)
          }
        })
      } else {
        res.status(200).json(data)
      }
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
