import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

const Login = ({ isLoggedIn, setIsLoggedIn, setUsername }) => {
  const [currentUsername, setCurrentUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHelper = async () => {
    const { data, status } = await axios.post('account/login', { username: currentUsername, password })
    console.log(data)
    if (status !== 200 || data.includes('ERROR')) {
      window.alert(data)
    } else {
      setUsername(currentUsername)
      setIsLoggedIn(true)
    }
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
            <Form.Control type="password" value={password} placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button size="sm" variant="outline-primary" onClick={submitHelper}>
            Login
          </Button>
          { isLoggedIn && <Redirect to="/"> </Redirect> }
          <br />
          <br />
          Not signed up yet? &nbsp;
          <Link to="/signup">
            <Button size="sm" variant="outline-primary"> Sign up now. </Button>
          </Link>
        </Form>
      </Container>
    </>
  )
}

export default Login
