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

FileUploader.uploadFile = (boardId, attachmentId, file) => {
  return new Promise((resolve, reject) => {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
    minioClient.putObject(bucketName, `${boardId}/${attachmentId}.${ext}`, file.buffer, file.mimetype, (err, etag) => {
      if (err) { return reject(err) }
      // TODO: REPLACE WITH ENV
      resolve({ etag: etag, url: `${process.env.PRELLO_APIURL}/boards/${boardId}/attachments/${attachmentId}.${ext}` })
    })
  })
}

FileUploader.getFile = (res, boardId, attachmentName) => {
  return new Promise((resolve, reject) => {
    minioClient.getObject(bucketName, `${boardId}/${attachmentName}`, (err, stream) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      stream.pipe(res)
    })
  })
}

FileUploader.removeFile = function (boardId, attachmentId, ext) {
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucketName, `${boardId}/${attachmentId}.${ext}`, err => {
      if (err) { console.error(err); return reject(err) }
      resolve('success')
    })
  })
}

module.exports = FileUploader
