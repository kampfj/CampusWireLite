const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/question')

const router = express.Router()
// interface with some model here, import it

// can assume we have access to _id in req.body
 router.get('/', (req, res) => {
   res.send('On API router')
 })

 router.get('/questions', async (req, res, next) => {
   try {
     await Question.find((err, questions) => {
        if (questions) {
          console.log(questions)
        } 
        if (err) {
          next(new Error('could not find questions'))
        }
     })
   } catch {
     res.send('could not fetch questions')
   }
 })

 router.post('/questions/add', isAuthenticated, async (req, res) => {
   const { questionText, author } = req.body
   try {
    await Question.create({ questionText, author })
    res.send('successfully added question')
   } catch {
     res.send('could not add question ')
   }
 })

 router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
   const { _id, answer } = req.body
   try {
     await Question.findById(_id, async (err, question) => {
       if (question) {
        question.answer = answer
        await question.save()
       }
       if (err) {
         next(new Error('could not update question'))
       }
     })
   } catch {
     res.send('could not add answer to question')
   }
 })

 module.exports = router