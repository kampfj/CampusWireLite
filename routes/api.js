const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()
// interface with some model here, import it

// can assume we have access to _id in req.body
 router.get('/', (req, res) => {
   res.send('On API router')
 })

 router.get('/questions', (req, res) => {
   res.send('implement logic for fetching all questions')
 })

 router.post('/questions/add', isAuthenticated, (req, res) => {
   res.send('implement logic for adding a question')
 })

 router.post('/questions/answer', isAuthenticated, (req, res) => {
   res.send('implement logic for adding an answer to a question')
 })

 module.exports = router