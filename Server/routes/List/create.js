module.exports = function (router, controller) {
  router.post('/boards/:id/lists', function (req, res) {
    controller.createList(req).then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  })
}
