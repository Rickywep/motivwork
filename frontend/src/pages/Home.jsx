import { Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import UserHome from '../components/UserHome';
import Feeds from '../components/Feeds';

export default function Home({ token, user }) {

  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <Container>
      <Row className="my-5">
        <Col md={4}>
          <UserHome user={user} />
        </Col>
        <Col>
          <Feeds token={token} />
        </Col>
      </Row>
    </Container>
  );
}
