import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InfoLesson = (props) => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/lesson/getLesson/${id}`).then(response => {
      setLesson(response.data[0]);
    });
  }, [id]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Informacje o lekcji</h1>
      <p>Adres: {lesson.address}</p>
      <p>Data: {lesson.date}</p>
      <p>Godzina: {lesson.time}</p>
    </div>
  );
};

export default InfoLesson;
