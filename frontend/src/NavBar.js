import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

const NavBar = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
  const logoutHelper = async () => {
    const result = await axios.post('/account/logout', {})
    setIsLoggedIn(false)
    setUsername('')
    console.log(result)
  }

  const renderLoggedOutNavRoutes = () => (
    <>
      <Nav.Link as={Link} to="/signup"> Sign Up </Nav.Link>
      <Nav.Link as={Link} to="/login"> Login </Nav.Link>
    </>
  )

  const renderLoggedInNavRoutes = () => (
    <>
      <Navbar.Text>
        Signed in as: &nbsp;
        {username}
      </Navbar.Text>
      &nbsp;
      <Link to="/">
        <Button variant="outline-secondary" onClick={logoutHelper}> Logout </Button>
      </Link>
      &nbsp;
      <Link to={`/ask/${username}`}>
        <Button variant="outline-secondary"> Ask a question </Button>
      </Link>
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
