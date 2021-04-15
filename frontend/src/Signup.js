import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHelper = async () => {
    const result = await axios.post('account/signup', { username, password })
  }

  return (
    <>
      <Container>
        <Form>
          <h1> Sign up </h1>
          <Form.Group>
            <Form.Label> Username </Form.Label>
            <Form.Control placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
            <Form.Text className="text-muted">
              Your username is what will show up when you ask a question in class!
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label> Password </Form.Label>
            <Form.Control placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Link to="/">
            <Button variant="outline-primary" type="submit" onClick={submitHelper}>
              Sign me up!
            </Button>
          </Link>
          <br />
          Already have an account?
          <Link to="/login"> 
            <Button variant="outline-info">
              Log in!
            </Button>
          </Link>
        </Form>
      </Container>
    </>
  )
}

export default Signup
