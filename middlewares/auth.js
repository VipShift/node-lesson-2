const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')
function auth() {
  return (req, res, next) => {
    const token = req.cookies.token
    try {
      const verifyResult = jwt.verify(token, JWT_SECRET)
      req.user = {
        email: verifyResult.email,
      }
      next()
    } catch (error) {
      return res.redirect('/login')
    }
  }
}

module.exports = auth
