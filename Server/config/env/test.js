module.exports = {
  db: process.env.MONGODB_URL_TEST,
  secretKey: process.env.SECRET_KEY,
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }
}
