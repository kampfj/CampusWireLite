import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'
import QuestionForm from './QuestionForm'

const NavBar = props => {
  const { askQuestionMode, setAskQuestionMode, isLoggedIn, setIsLoggedIn, username,
    setUsername } = props

  const askQuestionHelper = () => {
    setAskQuestionMode(true)
  }

  const logoutHelper = async () => {
    const result = await axios.post('/account/logout', {})
    setIsLoggedIn(false)
    setUsername('')
  }

  const renderLoggedOutNavRoutes = () => (
    <>
      &nbsp;
      <Nav.Link as={Link} to="/signup">
        <Button size="sm" variant="outline-primary"> Sign Up </Button>
      </Nav.Link>
      &nbsp;
      <Nav.Link as={Link} to="/login">
        <Button size="sm" variant="outline-primary"> Login </Button>
      </Nav.Link>
    </>
  )

  const renderLoggedInNavRoutes = () => (
    <>
      <Navbar.Text>
        Signed in as: &nbsp;
        {username}
      </Navbar.Text>
      &nbsp; &nbsp;
      <Link to="/">
        <Button size="sm" variant="outline-secondary" onClick={logoutHelper}> Logout </Button>
      </Link>
      &nbsp; &nbsp;
      <Button size="sm" variant="outline-secondary" onClick={askQuestionHelper}> Ask a question </Button>
      { askQuestionMode && <QuestionForm askQuestionMode={askQuestionMode} setAskQuestionMode={setAskQuestionMode} user={username} />}
    </>
  )

  return (
    <>
      <Navbar bg="light">
        <Link to="/">
          <Navbar.Brand> CampusWire Lite </Navbar.Brand>
        </Link>
        { !isLoggedIn
        && (
          renderLoggedOutNavRoutes()
        )}
        { isLoggedIn
        && (
          renderLoggedInNavRoutes()
        )}
      </Navbar>
    </>
  )
}

export default NavBar
