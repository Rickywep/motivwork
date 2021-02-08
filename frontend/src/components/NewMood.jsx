import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

export default function NewMood({ token }) {
  const [mood, setMood] = useState('');
  const [anon, setAnon] = useState(false);
  const history = useHistory();

  const queryApy = async () => {
    await axios
      .post(
        `https://api.meaningcloud.com/sentiment-2.1?key=82a16351d0c7666c340dbb2c5a66d4e7&of=json&txt=${mood}&lang=es`
      )
      .then((response) => {
        const polaridad = response.data.score_tag;
        const palabraConcepto = response.data.sentimented_concept_list[0].form;
        createMood(polaridad, palabraConcepto);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onChangeMood = (e) => {
    setMood(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    queryApy();
  };

  const createMood = async (polaridad, palabraConcepto) => {
    try {
      // const respuesta = 
      await axios.post(
        'http://localhost:4000/api/moods',
        { contenido: mood, anonimo: anon, polaridad: polaridad, palabra_concepto: palabraConcepto },
        {
          headers: { 'x-auth-token': token },
        }
      );
      history.push('/');
    } catch (error) {
      alert(error.response.data.msg);
      history.push('/login');
    }
  };

  return (
    <>
      <div className="bg-dark text-white">
        <Link to="/">
          <p className="p-3">Volver</p>
        </Link>
      </div>
      <Container>
        <Form onSubmit={onSubmit} className="mt-5 p-5 bg-white">
          <Form.Group>
            <Form.Label>Como te sientes hoy?</Form.Label>
            <Form.Control required minLength={20} as="textarea" onChange={onChangeMood} />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Anónimo" onChange={() => setAnon(!anon)} />
          </Form.Group>
          <Row>
            <Button
              className="ml-auto text-white"
              variant="white"
              type="submit"
              style={{ backgroundColor: '#1fa3c4' }}
            >
              Enviar
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
}
