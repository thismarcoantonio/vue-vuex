// Require main Dependencies
const express = require('express')
const bodyParser = require('body-parser')  
const cors = require('cors')
const morgan = require('morgan')

// Require some Helpers
const config = require('./config/config')
const { sequelize } = require('./models')

// Init the App
const app = express()

// Express Uses
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Routes
require('./routes')(app)

// Init Sequelize, then run the server
sequelize.sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`)
    })
  })
