const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) => {
  // Register Post Request (client/src/components/Register.vue)
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  // Login Post Request (client/src/components/Login.vue)
  app.post(
    '/login',
    AuthenticationController.login
  )
}
