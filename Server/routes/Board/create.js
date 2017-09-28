module.exports = function (router, controller) {
  router.post('/board', function (req, res) {
    controller.createBoard(req.body).then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  })
}
