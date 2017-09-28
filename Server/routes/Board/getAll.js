module.exports = function (router, controller) {
  router.get('/boards', function (req, res) {
    controller.getAllBoards().then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  })
}
