import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

export default function Header({ user }) {
  const { nombre } = user;

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    window.location.reload()
  };

  return (
    <Navbar variant="dark" style={{ backgroundColor: '#18809a' }}>
      <Navbar.Brand href="#home">Logo</Navbar.Brand>
      <div className="ml-auto d-flex">
        <p className="text-white text-uppercase font-weight-bold m-2 px-2">{nombre}</p>
        <Button variant="info" size="sm" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </div>
    </Navbar>
  );
}
