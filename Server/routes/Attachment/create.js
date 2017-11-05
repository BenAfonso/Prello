// const Util = require('../../controllers/Util')
 const {requiresLogin} = require('../../config/middlewares/authorization')
// const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')
 const multer = require('multer')
 const multerUpload = multer().any()
 module.exports = (router, controller) => {
   router.post('/boards/:boardId/lists/:listId/cards/:cardId/attachments', [requiresLogin, (req, res) => {
     multerUpload(req, res, function (err) {
       if (err) {
         return res.status(500).send('Error: an error occured while uploading').end()
       }
       if (!req.files && !req.file) {
         return res.status(400).send('Error: expect files to upload').end()
       }
       controller.createAttachment(req).then(result => {
         return res.status(201).send(result)
       }).catch(err => {
         console.log(err)
         return res.status(500).send(err)
       })
     })
   }])
 }
