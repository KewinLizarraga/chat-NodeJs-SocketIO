const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const user = await User.findOne({ email })

      const verifyPassword = function (user, password) {
        return bcrypt.compareSync(password, user.password)
      }

      if (!user) return done(null, false)
      if (!verifyPassword(user, password)) return done(null, false)

      return done(null, user)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport
