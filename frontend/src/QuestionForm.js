import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Link, useParams} from 'react-router-dom'

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState('')
  const { user } = useParams()

  const submitQuestionHelper = async () => {
    const result = await axios.post('/api/questions/add', { questionText, author: user })
    console.log(result)
  }

  return (
    <>
      <Container>
        <Form>
          <h1> Ask question </h1>
          <Form.Group>
            <Form.Label> Question </Form.Label>
            <Form.Control value={questionText} placeholder="Enter question" onChange={e => setQuestionText(e.target.value)} />
          </Form.Group>
          <Link to="/">
            <Button variant="outline-primary" type="submit" onClick={submitQuestionHelper}>
              Ask!
            </Button>
          </Link>
        </Form>
      </Container>
    </>
  )
}

export default QuestionForm
