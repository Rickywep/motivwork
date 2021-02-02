import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchUser from '../components/SearchUser';

export default function Feedback({ token }) {
  const [feedback, setFeedback] = useState({
    categoria: 'Buen trabajo',
    contenido: ''
  })
  const [colega, setColega] = useState('')

  const onChangeFeedback = (e) => {
    setFeedback({...feedback, [e.target.name]: e.target.value});

  };
  const onSubmit = (e) => {
    e.preventDefault();
    createFeedback({...feedback, colega: colega[0]._id});
  };

  const createFeedback = (feedback) => {
    return axios
      .post(
        'http://localhost:4000/api/feedbacks',feedback,
        {
          headers: { 'x-auth-token': token },
        }
      )
      .then((response) => console.log(response.data))
      .then(window.location.replace('/'));
  };
  return (
    <>
      <div className="bg-dark text-white">
        <Link to="/">
          <p className="p-3">Volver</p>
        </Link>
      </div>
      <Container className="bg-white mt-5 p-4">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>A quien va?</Form.Label>
            <SearchUser token={token} setColega={setColega} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Que?</Form.Label>
            <Form.Control as="select" name="categoria" onChange={onChangeFeedback}>
              <option>Buen trabajo</option>
              <option>Amable</option>
              <option>Divertido</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Por que?</Form.Label>
            <Form.Control as="textarea" onChange={onChangeFeedback} name="contenido" />
          </Form.Group>
          <Row>
            <Button
              className="ml-auto text-white"
              variant="white"
              type="submit"
              style={{ backgroundColor: '#1fa3c4' }}
            >
              Enviar Feedback
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
}
