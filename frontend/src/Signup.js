import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHelper = async () => {
    const { data, status } = await axios.post('account/signup', { username, password })
    if (status !== 200 || data.includes('ERROR')) {
      window.alert(data)
    }
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
            <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Link to="/">
            <Button size="sm" variant="outline-primary" type="submit" onClick={submitHelper}>
              Sign me up!
            </Button>
          </Link>
          <br /> <br />
          Already have an account? &nbsp;
          <Link to="/login">
            <Button size="sm" variant="outline-primary">
              Log in!
            </Button>
          </Link>
        </Form>
      </Container>
    </>
  )
}

export default Signup
