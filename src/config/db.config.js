const mongoose = require('mongoose')

const URI = process.env.URI

const db = mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports = db
