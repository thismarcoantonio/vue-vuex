const { User } = require('../models') // importing User from index.js models
const config = require('../config/config') // importing main config file
const jwt = require('jsonwebtoken') // importing jsonWebToken for the login Handle

function jwtSignUser (user) {
  // This token will persist for one week (60 seconds * 60 minutes * 24 hours * 7 days)
  const ONE_WEEK = 60 * 60 * 24 * 7
  // Return the json Sign with the provided user and then, will set the 'secret' authentication
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK // option to expire 
  })
}

module.exports = {
  // Register Method
  async register (req, res) {
    try {
      // Const user will get the data from the client (req.body)
      const user = await User.create(req.body)
      // Get the user data and convert them to JSON with a JWT token
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // If Error, throw 400 error handler
      res.status(400).send({
        error: `This email is already in use.`
      })
    }
  },
  // Login Method
  async login (req, res) {
    try {
      // Get the email and password to compare with an registered user
      const { email, password } = req.body
      const user = await User.findOne({
        // Find One user where the email == email
        where: {
          email
        }
      })
      // Error handling: If User doesn't exists
      if (!user) {
        return res.status(403).send({
          error: `This email isn't registered.`
        })
      }
      // Compare if the password is valid
      const isPasswordValid = await user.comparePassword(password)
      // Error handling: If password isn't valid, then the password doesn't match with the email
      if (!isPasswordValid) {
        return res.status(403).send({
          error: `Email and password doesn't match, check it again!`
        })
      }
      // If Everything is fine, return an object with the user and a new token
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // Error Handling: Maybe a server error...
      res.status(500).send({
        error: 'An error has occured trying to log in, please, try again.'
      })
    }
  }
}
