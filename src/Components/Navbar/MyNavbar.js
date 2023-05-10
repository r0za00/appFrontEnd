import { render } from "@testing-library/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,  BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Lesson from "../Lesson/Lesson";
import LoginForm from "../LoginForm/LoginForm";
import SignForm from "../SignForm/SignForm";
import Button from 'react-bootstrap/Button';
import AddLesson from "../AddLesson/AddLesson";
import React, { useState } from 'react';
import './MyNavbar.css';

const MyNavbar = (props)=> {

  const notLogged = () => { 
  localStorage.removeItem("isLogged")
  setTimeout(()=>{window.location.reload()},1000)
  }
    return <>
    <Router>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >Lessons Menager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          { localStorage.getItem('isLogged') && <><Nav.Link > 
              <Link to={`/lessons`} className="btn btn-light">My lessons</Link>
            </Nav.Link>
            <Nav.Link > 
              <Link to={`/add/lessons`} className="btn btn-light">Add Lesson</Link>
            </Nav.Link>
            <Nav.Link >
            <Link  to={`/login`} className="btn btn-light" onClick={notLogged}>LogOut</Link>
            </Nav.Link>
            </> 
            }
            { !localStorage.getItem('isLogged') && <><Nav.Link > 
              <Link to={`/login`} className="btn btn-light">Login</Link>
            </Nav.Link>
            <Nav.Link > 
              <Link to={`/signIn`} className="btn btn-light">Sign up</Link>
            </Nav.Link></> }
          </Nav>
        </Navbar.Collapse>
        { localStorage.getItem('isLogged') && <>
        <Button disabled variant="light">Login: {localStorage.getItem('login')}</Button>
        <Button disabled variant="light">Name: {localStorage.getItem('name')}</Button>
        <Button disabled variant="light">Surname: {localStorage.getItem('surname')}</Button>
        </>}
      </Container>
    </Navbar>
    <br/>
    <Switch>          
   
     {localStorage.getItem('isLogged') && <>
     <Route exact path='/lessons' component={Lesson}></Route>
     <Route exact path='/add/lessons' component={AddLesson}></Route></>}
    {!localStorage.getItem('isLogged') && <>
    <Route exact path='/login' component={LoginForm}></Route>
    <Route exact path='/signIn' component={SignForm}></Route></>}
    <Route path='*' component={LoginForm}></Route>

    </Switch>

    </Router>
    </>
}

export default MyNavbar