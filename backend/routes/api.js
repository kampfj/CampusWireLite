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
        next('could not find questions')
      }
    })
  } catch (err) {
    res.send(`caught error: ${err}`)
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { questionText, author } = req.body
  try {
    await Question.create({ questionText, author })
    res.send('successfully added question')
  } catch (err) {
    res.send(`caught error: ${err}`)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    await Question.findById(_id, async (err, question) => {
      if (question) {
        question.answer = answer
      } else {
        next('could not update question')
      }
    })
  } catch (err) {
    res.send(`caught error: ${err}`)
  }
})

module.exports = router
