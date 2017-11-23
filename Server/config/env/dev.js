module.exports = {
  db: process.env.MONGODB_URL_DEV,
  secretKey: process.env.SECRET_KEY,
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://176.142.249.180:3333/auth/google/callback'
  }
}
