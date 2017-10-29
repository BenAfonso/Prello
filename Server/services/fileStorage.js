const Minio = require('minio')

const bucketName = 'themightyprellostatic'
let FileUploader = {}

const minioClient = new Minio.Client({
  endPoint: 'themightyprello-minio.igpolytech.fr',
  port: 80,
  secure: true,
  accessKey: 'AKIAIOSFODNN7EXAMPLE',
  secretKey: 'wJalrXUtnFEMI/K7MDENG/EXAMPLEKEY'
})

FileUploader.uploadFile = function (boardId, attachmentId, file) {
  return new Promise((resolve, reject) => {
    minioClient.fPutObject(bucketName, `${boardId}/${attachmentId}`, file, 'application/octet-stream', (err, etag) => {
      if (err) return reject(err)
      resolve(etag)
    })
  })
}

FileUploader.removeFile = function (boardId, attachmentId) {
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucketName, `${boardId}/${attachmentId}}`, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = FileUploader
