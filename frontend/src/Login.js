import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [currentUsername, setCurrentUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHelper = async () => {
    const result = await axios.post('account/login', { username: currentUsername, password })
    setUsername(currentUsername)
    setIsLoggedIn(true)
    console.log('hi there')
    console.log(result)
  }

  return (
    <>
      <Container>
        <Form>
          <h1> Log in </h1>
          <Form.Group>
            <Form.Label> Username </Form.Label>
            <Form.Control value={currentUsername} placeholder="Enter username" onChange={e => setCurrentUsername(e.target.value)} />
            <Form.Text className="text-muted">
              Your username is what will show up when you ask a question in class!
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label> Password </Form.Label>
            <Form.Control value={password} placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Link to="/">
            <Button variant="outline-primary" onClick={submitHelper}>
              Login
            </Button>
          </Link>
          <br />
          Not signed up yet?
          <Link to="/signup">
            <Button variant="outline-info"> Sign up now. </Button>
          </Link>
        </Form>
      </Container>
    </>
  )
}

export default Login
