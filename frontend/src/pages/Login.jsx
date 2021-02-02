import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onChangeUsuario = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('http://localhost:4000/api/auth', user);
      if (respuesta) {
        const token = respuesta.data.token;
        localStorage.setItem('token', token);
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error?.response.data.msg);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={8} md={6} className="mx-auto my-5">
          <Card className="border-0">
            <Card.Header style={{ backgroundColor: '#125d70' }}>
              <h4 className="text-white">MotivWork</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmitLogin}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresar su email"
                    name="email"
                    onChange={onChangeUsuario}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su password"
                    name="password"
                    onChange={onChangeUsuario}
                  />
                </Form.Group>
                <Row>
                  <Button
                    className="mx-auto text-white"
                    variant="white"
                    type="submit"
                    style={{ backgroundColor: '#1fa3c4' }}
                  >
                    Iniciar Sesión
                  </Button>
                </Row>
                <Row>
                  <Link className="mx-auto mt-2" to="/register" style={{ color: '#18809a' }}>
                    ¿No tiene una cuenta? Cree una aquí
                  </Link>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
