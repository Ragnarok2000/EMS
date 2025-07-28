import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Navbar.css'

const CustomNavbar = () => {
  return (
    <div  > 
        <Navbar bg = "dark" data-bs-theme = "dark"  >
        <Container  >
          <Navbar.Brand to        = "/" className = 'fs-3 my-2  ' >Employee Management System</Navbar.Brand>
          <Nav          className = "ml-auto">
          <Nav.Link     as        = {Link}  to    = "/">Employees</Nav.Link>
          <Nav.Link     as        = {Link} to     = "/employee">Post Employee</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      </div>
  )
}

export default CustomNavbar;
