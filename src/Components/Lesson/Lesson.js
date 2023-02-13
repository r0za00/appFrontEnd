import React, { useReducer } from "react"
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card,Container,ListGroup } from "react-bootstrap";
import { Col,Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

const Lesson = (props) => {

    const [listOfLessons,setListOfLessons] = useState([])
    useEffect(()=>{
         localStorage.getItem("isTeacher") === "true" ?   getDataTeacher() :  getDataUser();
    },[])

    const getDataUser = () => {
        const userId = localStorage.getItem("id")
        axios.get("http://localhost:8080/lesson/getUser/"+userId).then(respose => {
            setListOfLessons(respose.data)
        })
    }
    const getDataTeacher = () => {
      const teacherId = localStorage.getItem("id")
      axios.get("http://localhost:8080/lesson/getTeacher/"+teacherId).then(respose => {
          setListOfLessons(respose.data)
      })
  }

  const deleteLesson = (id) => {
    
     axios.delete("http://localhost:8080/lesson/delete/"+id).then(respose => {
        window.location.reload();
    })
}
  
    return <>
    <Container>
    <Row>
        {listOfLessons.map((lekcja)=> <Col xs={10} xl = {10}>
            <Card style={{ width: '50rem', marginBottom: '1rem' }}>
                <Card.Body>{
                    <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>name</th>
                        <th>surname</th>
                        <th>address</th>
                        <th>date</th>
                        <th>time</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{lekcja?.name}</td>
                        <td>{lekcja?.surname}</td>
                        <td>{lekcja?.address}</td>
                        <td>{lekcja?.date}</td>
                        <td>{lekcja?.time}</td>
                        <td><Button variant="danger" onClick={()=>{
                            deleteLesson(lekcja.id)
                        }} >Usuń</Button></td>
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

export default Lesson;