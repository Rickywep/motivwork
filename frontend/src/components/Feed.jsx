import moment from 'moment';
import { Col, Container, Row } from 'react-bootstrap';

export default function Feed({ feed }) {
  const { categoria, contenido, creador, colega, registro } = feed;

  moment.locale('fr', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
      '_'
    ),
  });

  const fecha = moment(registro).format('DD MMMM YYYY');
  return (
    <Container className="bg-white mb-5 mx-2">
      <Row className="bg-info p-2 text-center text-white align-items-center">
        <Col>
          {creador.img ? (
            <img
              src={creador.img}
              alt="profile"
              width="30"
              className="rounded-circle"
              style={{ border: '2px solid #18809a' }}
            />
          ) : (
            <img
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt="profile"
              width="30"
              className="rounded-circle"
              style={{ border: '2px solid #18809a' }}
            />
          )}
          <p className="text-uppercase m-0">{creador.nombre}</p>
        </Col>
        <Col>
          <p className="m-0 mt-2">comento a</p>
        </Col>
        <Col>
          {colega.img ? (
            <img
              src={colega.img}
              alt="profile"
              width="30"
              className="rounded-circle"
              style={{ border: '2px solid #18809a' }}
            />
          ) : (
            <img
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt="profile"
              width="30"
              className="rounded-circle"
              style={{ border: '2px solid #18809a' }}
            />
          )}
          <p className="text-uppercase m-0">{colega.nombre}</p>
        </Col>
      </Row>
      <div className="text-center">
        <h5 className=" text-uppercase p-2" style={{ color: '#18809a' }}>
          {categoria}
        </h5>
        <p>{contenido}</p>
        <p className="text-muted text-right">{fecha}</p>
      </div>
    </Container>
  );
}
