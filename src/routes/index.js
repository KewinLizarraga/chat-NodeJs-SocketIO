const router = require('express').Router()
const bcrypt = require('bcrypt')
const md5 = require('md5')
const { User } = require('../models')
const { AuthController } = require('../controllers')

router.get('/chat', AuthController.isAuthenticatedUser, (req, res) => {
  const user = {
    email: req.user.email,
    gravatar: req.user.gravatar
  }
  res.render('chat/chat', {
    pageName: 'Chat NodeJS SocketIO',
    user
  })
})

router.get('/login', (req, res) => {
  res.render('login', {
    pageName: 'Iniciar Sesión',
    layout: false
  })
})

router.post('/login', AuthController.authenticateUser)

router.get('/signin', (req, res) => {
  res.render('signin', {
    pageName: 'Registrar',
    layout: false
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
