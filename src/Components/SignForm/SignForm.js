import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { Container,Row, Card } from "react-bootstrap";
import axios from "axios";

const SignForm = (props)=> {

  const [user,setUser] = useState({})
  const [teacher,setisTeacher] = useState(false)
 //const [valid,setValid] = useState(true)

    const signIn = () => {
      const data={...user, teacher}
      axios.post("http://localhost:8080/user/add",data).then(
      alert("New user added!")
      )
      
    }

   
    // const checkValidity = () => {
  
    //   for (const value of Object.values(user)) { 
    //       if (value === null || value === '') setValid(false)
    //   }

    // }

    // useEffect(checkValidity,[user])
    //const arr = [1,2,3] const arr1 = [...arr,4] => [1,2,3,4] 

    const setObjectsData = (event,fieldKey) => {
      setUser(prevState=> ({...prevState, [`${fieldKey}`]: event.target.value}))
    }
    
    return (
      <Container>
        <Row className="display-flex justify-content-center">
        <Card className="align-items-center" style={{ width: '40rem', marginBottom: '1rem'}}>
        <Card.Body>{
        <Form style={{ width: '30rem', marginBottom: '1rem'}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control onChange={(event)=>setObjectsData(event,"login")} type="text" placeholder="Enter Login" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(event)=>setObjectsData(event,"password")} type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control  onChange={(event)=>setObjectsData(event,"name")} type="text" placeholder="Enter Name" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Surname</Form.Label>
            <Form.Control  onChange={(event)=>setObjectsData(event,"surname")} type="text" placeholder="Enter Surname" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control  onChange={(event)=>setObjectsData(event,"address")} type="text" placeholder="Enter Address" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={(event)=>setisTeacher(prevState=>!prevState)} type="checkbox" defaultChecked={false} label="IsTeacher" />
          </Form.Group>
          
          <Button variant="primary" disabled={Object.keys(user).length !== 5} onClick={signIn}>
            Submit
          </Button>
        </Form>}
      </Card.Body>
      </Card>
      </Row>
    </Container>
      );
    }

export default SignForm