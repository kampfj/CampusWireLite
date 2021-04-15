import React, { useState, useEffect } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AnswerQuestion from './AnswerQuestion'
import { StyledContainer } from '../styles/styles'

const Homepage = ({ isLoggedIn, username }) => {
  const [questions, setQuestions] = useState([])
  const [answerQuestionMode, setAnswerQuestionMode] = useState(false)

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      const { data, status } = await axios.get('api/questions')
      if (status !== 200 || data.includes('ERROR')) {
        window.alert(data)
      } else {
        setQuestions(data)
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const answerQuestionHelper = () => {
    setAnswerQuestionMode(true)
  }

  return (
    questions.map(({ questionText, answer, author, _id }, index) => (
      <StyledContainer key={index}>
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
            { isLoggedIn && answer === undefined && (
              <Button size="sm" variant="outline-info" onClick={answerQuestionHelper}> Answer this question </Button>
            )}
            { answerQuestionMode
              ? <AnswerQuestion questionText={questionText} answerQuestionMode={answerQuestionMode} setAnswerQuestionMode={setAnswerQuestionMode} id={_id} /> : '' }
            { answer !== undefined && (
              <p> Answer: {answer} </p>
            )}
          </Card.Footer>
        </Card>
      </StyledContainer>
    ))
  )
}

export default Homepage
