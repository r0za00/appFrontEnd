import React from "react";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { Button, Card,Container} from "react-bootstrap";
import { Col,Row } from "react-bootstrap";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const AddLesson = (props)=> {

  const [teacher,setTeacher] = useState(localStorage.getItem("isTeacher") === "true" ?   false : true)
  const [lesson,setLesson] = useState({})
  const [listOfUsers,setListOfUsers] = useState([])
  const [user,setUser] = useState({})

  useEffect(()=>{
    getUsersOrTeachers();
},[])

      const addLesson = (isTeacher) => {
      const lessonUserId = {...lesson,userId:Number(localStorage.getItem("id"))}
      const lessonTeacherId = {...lesson,teacherId:Number(localStorage.getItem("id"))}
      axios.post("http://localhost:8080/lesson/add",isTeacher?lessonTeacherId:lessonUserId).then(console.log)
      alert("New lesson added!")
    }

    const getUsersOrTeachers = () => {
      axios.get("http://localhost:8080/user/getUserOrTeachers/"+teacher).then(respose => {
        setListOfUsers(respose.data)
      })
  }

  const chooseUser = (selectedUser) => {
    setUser(selectedUser);
    setLesson({
      userId: selectedUser.id,
      name: selectedUser.name,
      surname: selectedUser.surname,
      address: selectedUser.address,
    });
  }

    const setObjectsData = (event,fieldKey,isId=false) => {
      setLesson(prevState=> ({...prevState, [`${fieldKey}`]: isId ? Number(event.target.value) : event.target.value}))
    }
    
    return <>
    <Container>
        <Row className="display-flex justify-content-center">
        <Card className="align-items-center" style={{ width: '40rem', marginBottom: '1rem'}}>
        <Card.Body>{
        <Form style={{ width: '30rem', marginBottom: '1rem'}}>
          {localStorage.getItem("isTeacher") === "true" && 
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>user id</Form.Label>
            <Form.Control disabled value={user.id} onChange={(event)=>setObjectsData(event,"userId",true)} type="text" placeholder="Enter userID" />
          </Form.Group>}

          {localStorage.getItem("isTeacher") === "false" && 
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>teacher id</Form.Label>
            <Form.Control disabled value={user.id} onChange={(event)=>setObjectsData(event,"teacherId",true)} type="text" placeholder="Enter teacherID" />
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>name</Form.Label>
          <Form.Control disabled value={user.name} onChange={(event) => setObjectsData(event, "name")} type="text" placeholder="Enter Name" />
          </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>surname</Form.Label>
          <Form.Control disabled value={user.surname} onChange={(event) => setObjectsData(event, "surname")} type="text" placeholder="Enter Surname" />
          </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Address</Form.Label>
          <Form.Control disabled value={user.address} onChange={(event) => setObjectsData(event, "address")} type="text" placeholder="Enter Address" />
        </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Date</Form.Label>
            <Form.Control  onChange={(event)=>setObjectsData(event,"date")} type="date" placeholder="Enter Date" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Hour</Form.Label>
            <Form.Control  onChange={(event)=>setObjectsData(event,"time")} type="time" placeholder="Enter Time" />
          </Form.Group>
          
          <Button variant="primary" disabled={Object.keys(lesson).length !== 6} onClick={()=>{addLesson(localStorage.getItem("isTeacher") === "true")}}>
            Submit
          </Button>
        </Form>}
      </Card.Body>
      </Card>

      </Row>
        <Row className="justify-content-center">
        {listOfUsers.map((user)=> 
        <Col xs={10} xl = {10}>
            <Card style={{ width: '50rem', margin: '0 auto' }}>
                <Card.Body>{
                    <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>login</th>
                        <th>name</th>
                        <th>surname</th>
                        <th>address</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{user?.id}</td>
                        <td>{user?.login}</td>
                        <td>{user?.name}</td>
                        <td>{user?.surname}</td>
                        <td>{user?.address}</td>
                        <td><Button variant="primary" onClick={() => chooseUser(user)}>Choose</Button></td>
                      </tr>
                    </tbody>
                    </Table>
                }</Card.Body>
            </Card>
        </Col>)}
    </Row>
    </Container>
      </>
    }

export default AddLesson