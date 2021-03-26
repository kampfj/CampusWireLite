const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')
const isAuthenticated = require('./middlewares/isAuthenticated')

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/testdb'
const ONE_DAY = 24 * 60 * 60 * 1000

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(isAuthenticated)
app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: ONE_DAY, // 24 hours
  })
)
// home URL route 
app.get('/', (req, res) => {
  res.send('We are on home')
})

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

// listening on the server 
app.listen(3000, () => {
  console.log('listening on port 3000')
})