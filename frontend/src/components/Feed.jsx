import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Feed({ feed }) {
  const { categoria, contenido, creador, colega, registro } = feed;

  return (
    <Container className="bg-white mb-5 mx-2">
      <Row className="bg-info p-2 text-center text-white align-items-center">
        <Col className="">
          <img
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt="profile"
            width="30"
            className="rounded-circle"
            style={{ border: '2px solid #18809a' }}
          />
          <p className="text-uppercase m-0">{creador.nombre}</p>
        </Col>
        <Col>
          <p className="m-0 mt-2">comento a</p>
        </Col>
        <Col className="">
          <img
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt="profile"
            width="30"
            className="rounded-circle"
            style={{ border: '2px solid #18809a' }}
          />
          <p className="text-uppercase m-0">{colega.nombre}</p>
        </Col>
      </Row>
      <div className="text-center">
        <h5 className=" text-uppercase p-2" style={{ color: '#18809a' }}>
          {categoria}
        </h5>
        <p>{contenido}</p>
        <p className="text-muted text-right">{registro}</p>
      </div>
    </Container>
  );
}
