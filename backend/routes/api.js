const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/question')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('On API router')
})

router.get('/questions', async (req, res, next) => {
  try {
    await Question.find((err, questions) => {
      if (questions) {
        res.send(questions)
      } else {
        next('ERROR: there was a problem loading the questions')
      }
    })
  } catch (err) {
    res.send(`ERROR: ${err}`)
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { questionText, author } = req.body
  try {
    await Question.create({ questionText, author })
    res.send('successfully added question')
  } catch (err) {
    res.send(`ERROR: ${err}`)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    await Question.findById(_id, (err, question) => {
      if (question) {
        question.answer = answer
        question.save()
        res.send('successfully added q')
      } else {
        next('ERROR: could not update question')
      }
    })
  } catch (err) {
    res.send(`ERROR: ${err}`)
  }
})

module.exports = router
