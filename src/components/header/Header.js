import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar} from 'react-bootstrap'
import "./header.css"
import logo from "./../../assets/img/barrel.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
  const [loggedUser, setLoggedUser] = useState({})
  const [token, setToken] = useState("")
  let navigate = useNavigate();

  /* useEffect(() => {
    const token = localStorage.getItem("jwtoken")
    if(token) {
      handleGetUser(token);
    }else {
      setLoggedUser({})
    }
  }, [navigate]) */

    useEffect(() => {
      const token = localStorage.getItem("jwtoken");
      if(token) {
        handleGetUser(token);
        setToken(token)
      } else setToken(token)
    }, []);

  const getAuth = async(token) => {
    try {
      const {data} = await axios.get("http://localhost:4000/api/user/userData", {headers: {Authorization: token}}) 
    } catch (error) {
      console.log(error)
    }
  
  }
  
  
  const handleGetUser = async (token) => {
    try {
      if (loggedUser.name) return;
      const {data} = await axios.get("http://localhost:4000/api/user/userData", {headers: {Authorization: token}})
      setLoggedUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtoken')
    setLoggedUser({});
    navigate('/login')
  }


  return (
    <div className='header_container'>
      <Navbar className='nav' bg="dark" expand="lg" variant='dark'>
      <Container className='container'>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        {
          loggedUser.name && <Nav className="links">   
            <Nav.Link href="/main">Main</Nav.Link>
          </Nav> 
          
        }
        <img className="logo" src={logo} alt="" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {
            !loggedUser.name &&
            <Nav className="me-auto">   
                  <Nav.Link href="/login">login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          }
          <div>
            {
            loggedUser.name && 
              <div className='welcome'> 
                <Button variant='danger' onClick={handleLogout}>log out</Button>
                <h5 className='welcomeText'>"Welcome {loggedUser.name}"</h5>
              </div>
            } 
          </div>


        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header