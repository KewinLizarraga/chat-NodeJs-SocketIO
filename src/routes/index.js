const router = require('express').Router()
const bcrypt = require('bcrypt')
const md5 = require('md5')
const { User, Message } = require('../models')
const { AuthController } = require('../controllers')

router.get('/chat', AuthController.isAuthenticatedUser, (req, res) => {
  const room = 0
  const userSession = {
    email: req.user.email,
    gravatar: req.user.gravatar
  }
  const message = 0
  res.render('chat/chat', {
    pageName: 'Chat NodeJS SocketIO',
    userSession,
    room,
    message
  })
})

router.get('/chat/sala/:room', AuthController.isAuthenticatedUser, async (req, res) => {
  const { room } = req.params
  const userSession = {
    email: req.user.email,
    gravatar: req.user.gravatar
  }
  const user = await User.find()
  const message = await Message.find().populate('user')
  res.render('chat/chat', {
    pageName: `Chat | Sala ${room}`,
    user,
    userSession,
    room,
    message
  })
})

router.get('/login', (req, res) => {
  res.render('login', {
    pageName: 'Iniciar Sesión'
  })
})

router.post('/login', AuthController.authenticateUser)

router.get('/signin', (req, res) => {
  res.render('signin', {
    pageName: 'Registrar'
  })
})

router.post('/signin', (req, res) => {
  const user = new User(req.body)
  user.password = bcrypt.hashSync(user.password, 10)
  user.gravatar = md5(user.email)
  user.save()
  res.redirect('/login')
})

module.exports = router
