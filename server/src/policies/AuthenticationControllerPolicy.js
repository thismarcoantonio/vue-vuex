const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{6,32}$')
      )
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address!'
          })
          break
        case 'password':
          res.status(400).send({
            error: `You must provide a password that matches with the following rules
              <br>Only Numbers, Lowercase and Uppercase characters
              <br>Must have at least 6 characters and less than 32`
          })
          break
        default:
          res.status(400).send({
            error: 'Oops! Account not registered, please, try again.'
          })
          break
      }
    } else {
      next()
    }
  }
}
