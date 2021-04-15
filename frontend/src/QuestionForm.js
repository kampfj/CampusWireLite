import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const QuestionForm = ({ askQuestionMode, setAskQuestionMode, user }) => {
  const [questionText, setQuestionText] = useState('')

  const cancelHandler = () => {
    setAskQuestionMode(false)
  }

  const submitQuestionHelper = async () => {
    const { data, status } = await axios.post('/api/questions/add', { questionText, author: user })
    if (status !== 200 || data.includes('ERROR')) {
      window.alert(data)
    }
    setAskQuestionMode(false)
  }

  return (
    <>
      <Modal show={askQuestionMode} backdrop="static" keyboard="false">
        <Modal.Header>
          <Modal.Title>Ask Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label> Question </Form.Label>
              <Form.Control value={questionText} placeholder="Enter question" onChange={e => setQuestionText(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="outline-secondary" onClick={cancelHandler}>Cancel</Button>
          <Button variant="outline-primary" onClick={submitQuestionHelper}> Ask! </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default QuestionForm
