const mongosse = require('mongoose')
const validator = require('validator')

const userSchema = new mongosse.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
})

const User = mongosse.model('User', userSchema)
module.exports = User
