const passport = require('passport')

module.exports = {
  authenticateUser: passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios.'
  }),
  isAuthenticatedUser: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    return res.redirect('/login')
  }
}
