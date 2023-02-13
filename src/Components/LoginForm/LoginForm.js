import React from "react";
import { Container,Row, Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
const LoginForm = (props)=> {

   

    const [user,setUser] = useState({})
  
   
       const login = () => {
         axios.post("http://localhost:8080/user/checkUser",user).then(res=>{
          localStorage.setItem("isLogged",true)
          localStorage.setItem("id",res.data.id)
          localStorage.setItem("login",res.data.login)
          localStorage.setItem("name",res.data.name)
          localStorage.setItem("surname",res.data.surname)
          localStorage.setItem("isTeacher",res.data.teacher)
          window.location.reload();
          
         }).catch(err => {
           alert("Invalid data!")
         })
       }
  
   
       const setObjectsData = (event,fieldKey) => {
         setUser(prevState=> ({...prevState, [`${fieldKey}`]: event.target.value}))
       }
    return (
      <Container>
        <Row className="display-flex justify-content-center">
        <Card className="align-items-center" style={{ width: '40rem', marginBottom: '1rem'}}>
        <Card.Body>{
          <Form style={{ width: '30rem', marginBottom: '1rem'}}>
            <Form.Group className="mb-3" controlId="formLogin">
              <Form.Label>Login</Form.Label>
              <Form.Control onChange={(e)=>setObjectsData(e,'login')} type="text" placeholder="Enter Login" />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control  onChange={(e)=>setObjectsData(e,'password')} type="password" placeholder="Enter Password" />
            </Form.Group>
            <Button onClick={login} variant="primary">
              Submit
            </Button>
          </Form>}
          </Card.Body>
          </Card>
          </Row>
        </Container>
      );
    }

export default LoginForm