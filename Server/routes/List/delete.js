module.exports = (router, controller) => {
  /**
  * @swagger
  * /boards/{boardid}/lists/{listid}:
  *   delete:
  *     tags:
  *       - Lists
  *     description: Delete a row by his id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardid
  *         description: The id of the board object where the list is
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *       - name: listid
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
  router.delete('/boards/:boardid/lists/:listid', function (req, res) {
    controller.removeList(req).then((data) => {
      res.status(200).send('The list has been deleted')
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
