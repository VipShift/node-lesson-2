const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./constants')

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10)
  await User.create({ email, password: passwordHash })
}

async function loginUser(email, password) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found')

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) throw new Error('Invalid password')

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' })
}
module.exports = { addUser, loginUser }
