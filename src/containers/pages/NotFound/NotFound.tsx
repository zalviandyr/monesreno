import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export class NotFound extends Component {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col className="text-center">
            <h1>Not Found</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
