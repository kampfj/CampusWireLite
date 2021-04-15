import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const AnswerQuestion = ({ questionText, answerQuestionMode, setAnswerQuestionMode, id }) => {
  const [answer, setAnswer] = useState('')

  const cancelHandler = () => {
    setAnswerQuestionMode(false)
  }

  const answerQuestionHandler = async () => {
    const result = await axios.post('api/questions/answer', { _id: id, answer })
    setAnswerQuestionMode(false)
    console.log('hi')
  }

  return (
    <Modal show={answerQuestionMode} backdrop="static" keyboard="false">
      <Modal.Header>
        <Modal.Title>Answer Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> {questionText} </p>
        <Form>
          <Form.Group>
            <Form.Label> Answer </Form.Label>
            <Form.Control value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Answer goes here" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={cancelHandler}>Cancel</Button>
        <Button variant="outline-primary" type="submit" onClick={answerQuestionHandler}>Answer</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AnswerQuestion
