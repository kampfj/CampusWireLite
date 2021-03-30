const express = require('express')
const router = express.Router()
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')
// interface with some model here, import it 
/**
 * localhost:3000/account/signup: POST route for signup
   localhost:3000/account/login: POST route for login
   localhost:3000/account/logout: POST route for logout

   Note that, in account.js, you should only say 
   router.post('/signup', ...) instead of 
   router.post('/account/signup', ...). 
   You should specify the /account route prefix in server.js.
 */
router.get('/', (req, res) => {
  res.send('On account router')
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    res.send('successfully created a new user')
  } catch {
    res.send('could not sign up user')
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    await User.findOne({ username, password }, (err, user) => {
      if (user) {
        req.session.username = username
        req.session.password = password
        res.send('we logged you in')
      } 
      if (err) {
        next(new Error('could not log you in'))
      }
    })
  } catch {
    console.log('we had an error trying to create the user')
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session = {}
  res.send('successfully logged out')
})

module.exports = router