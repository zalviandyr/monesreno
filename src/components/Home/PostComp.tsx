import React, { Component } from 'react';
import LazyLoad from 'vanilla-lazyload';
import { Row, Col, Card } from 'react-bootstrap';

export interface PostProps {
  name: string;
  time: string;
  post: string;
}

// initial
if (!(document as any).lazyLoadInstance) {
  (document as any).lazyLoadInstance = new LazyLoad({ elements_selector: '.lazy' });
}

export class PostComp extends Component<PostProps, {}> {
  componentDidMount() {
    (document as any).lazyLoadInstance.update();
  }

  componentDidUpdate() {
    (document as any).lazyLoadInstance.update();
  }

  render() {
    return (
      <Row className="mt-2 mb-2 lazy">
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title>{this.props.name}</Card.Title>
              <p className="small text-right">{this.props.time}</p>
              <p className="text-justify">{this.props.post}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
