const express = require('express')
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')
const session = require('express-session')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const passport = require('./config/passport.config')
const route = require('./routes')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: 'dsaDDSk32DAZd3d',
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', route)

io.on('connection', (socket) => {
  socket.on('chat', (data) => {
    console.log(data)
    io.sockets.emit('chat', data)
  })
})

module.exports = server
