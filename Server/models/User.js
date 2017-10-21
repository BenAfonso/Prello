const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {type: String, default: ''},
  username: { type: String, default: '' },
  provider: { type: String, default: '' },
  passwordHash: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  enabled: { type: Boolean, default: false },
  email: { type: String, default: '' },
  picture: { type: String, default: '' },
  google: {}
})

const oAuthTypes = ['google']

const validatePresenceOf = value => value && value.length

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.passwordHash = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

UserSchema.path('name').validate(function (name) {
  if (this.skipValidation()) return true
  return name.length > 0
}, 'Name cannot be blank')

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true
  return email.length > 0
}, 'Email cannot be blank')

/* UserSchema.path('email').validate(function (email, fn) {
  const User = mongoose.model('User')
  if (this.skipValidation()) fn(true)

  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Email already exists') */

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true
  return username.length > 0
}, 'Username cannot be blank')

UserSchema.path('passwordHash').validate(function (passwordHash) {
  if (this.skipValidation()) return true
  return passwordHash.length && this._password.length
}, 'Password cannot be blank')

/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'))
  } else {
    next()
  }
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.passwordHash
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider)
  }
}

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username'
    return this.findOne(options.where)
      .select(options.select)
      .exec(cb)
  }
}

mongoose.model('User', UserSchema)
