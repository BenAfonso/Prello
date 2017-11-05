const Minio = require('minio')

const bucketName = 'themightyprellostatic'
let FileUploader = {}

const minioClient = new Minio.Client({
  endPoint: 'themightyprello-minio.igpolytech.fr',
  port: 443,
  secure: true,
  accessKey: 'AKIAIOSFODNN7EXAMPLE',
  secretKey: 'wJalrXUtnFEMI/K7MDENG/EXAMPLEKEY'
})

FileUploader.uploadFile = function (boardId, attachmentId, file) {
  return new Promise((resolve, reject) => {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
    minioClient.putObject(bucketName, `${boardId}/${attachmentId}.${ext}`, file.buffer, file.mimetype, (err, etag) => {
      if (err) { return reject(err) }
      // TODO: REPLACE WITH ENV
      resolve({ etag: etag, url: `http://localhost:3000/boards/${boardId}/attachments/${attachmentId}.${ext}` })
    })
  })
}

FileUploader.getFile = function (boardId, attachmentName) {
  return new Promise((resolve, reject) => {
    minioClient.getObject(bucketName, `${boardId}/${attachmentName}`).then(res => {
      resolve(res.read())
    }).catch(err => {
      console.error(err)
      reject(err)
    })
  })
}

FileUploader.removeFile = function (boardId, attachmentId) {
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucketName, `${boardId}/${attachmentId}}`, err => {
      if (err) { console.error(err); return reject(err) }
      resolve()
    })
  })
}

module.exports = FileUploader
