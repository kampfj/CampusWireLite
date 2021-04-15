import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const AnswerQuestion = ({ questionText, answerQuestionMode, setAnswerQuestionMode, id }) => {
  const [answer, setAnswer] = useState('')

  const cancelHandler = () => {
    setAnswerQuestionMode(false)
  }

  const answerQuestionHandler = async () => {
    const { data, status } = await axios.post('api/questions/answer', { _id: id, answer })
    if (status !== 200 || data.includes('ERROR')) {
      window.alert(data)
    }
    setAnswerQuestionMode(false)
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
        <Button size="sm" variant="outline-secondary" onClick={cancelHandler}>Cancel</Button>
        <Button size="sm" variant="outline-primary" type="submit" onClick={answerQuestionHandler}>Answer</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AnswerQuestion
