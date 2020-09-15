const express = require('express')
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('chat', {
    pageName: 'Chat NodeJS SocketIO'
  })
})

module.exports = app
