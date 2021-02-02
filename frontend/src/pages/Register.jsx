import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({
    nombre: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { password, passwordConfirm } = user;

  const onChangeUsuario = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitRegistro = async (e) => {
    e.preventDefault();
    //password de 6 caracteres
    if (password.length < 6) {
      alert('El password debe ser al menos de 6 caracteres');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Los password no son iguales');
      return;
    }

    try {
      const respuesta = await axios.post('http://localhost:4000/api/usuarios', user);
      if (respuesta) {
        const token = respuesta.data.token;
        localStorage.setItem('token', token);
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error.response.data.msg[0].msg);
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
              <Form onSubmit={onSubmitRegistro}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su Nombre y Apellido"
                    name="nombre"
                    onChange={onChangeUsuario}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
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
                <Form.Group>
                  <Form.Label>Confirmar Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su password de nuevo"
                    name="passwordConfirm"
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
                    Registrarme
                  </Button>
                </Row>
                <Row>
                  <Link className="mx-auto mt-2" to="/login" style={{ color: '#18809a' }}>
                    ¿Ya tiene una cuenta? Iniciar sesión
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
