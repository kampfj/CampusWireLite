import React, { useState, useEffect } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AnswerQuestion from './AnswerQuestion'

const Homepage = ({ isLoggedIn, username }) => {
  const [questions, setQuestions] = useState([])
  const [answerQuestionMode, setAnswerQuestionMode] = useState(false)

  useEffect(async () => {
    const { data } = await axios.get('api/questions')
    setQuestions(data)
  }, [])

  const answerQuestionHelper = () => {
    setAnswerQuestionMode(true)
  }

  return (
    questions.map(({ questionText, answer, author, _id }, index) => (
      <Container key={index}>
        <Card>
          <Card.Header> Author: {author} </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {questionText}
              </p>
            </blockquote>
          </Card.Body>
          <Card.Footer>
            { isLoggedIn && (
              <Button variant="outline-info" onClick={answerQuestionHelper}> Answer this question </Button>
            )}
            { answerQuestionMode
              ? <AnswerQuestion questionText={questionText} answerQuestionMode={answerQuestionMode} setAnswerQuestionMode={setAnswerQuestionMode} id={_id} /> : '' }
          </Card.Footer>
        </Card>
      </Container>
    ))
  )
}

export default Homepage
