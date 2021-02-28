import React, { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import { AxiosService } from '../../../helpers';

interface MyState {
  alerts: Array<{ message: string }>;
  progress: {
    isShow: boolean;
  };
}

export class Register extends Component<RouteComponentProps, MyState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      alerts: [],
      progress: {
        isShow: false,
      },
    };
  }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const name = document.querySelector('[name="name"]') as HTMLInputElement;
    const username = document.querySelector('[name="username"]') as HTMLInputElement;
    const password = document.querySelector('[name="password"]') as HTMLInputElement;
    const confirmPassword = document.querySelector('[name="confirmPassword"]') as HTMLInputElement;

    if (password.value !== confirmPassword.value) {
      const alerts = [...this.state.alerts, { message: 'Password and Confirm Password must same' }];
      this.setState({ alerts: alerts });

      this.resetAlert();
      return;
    }

    const postData = {
      name: name.value,
      username: username.value,
      password: password.value,
    };

    // show progress
    this.setState({ progress: { isShow: true } });

    AxiosService.post('/users/register', postData)
      .then((res) => {
        this.resetProgress();

        this.props.history.push('/login');
      })
      .catch((err) => {
        this.resetProgress();

        const alerts: Array<{ message: string }> = [];
        if (Array.isArray(err.response.data.message)) {
          const array: Array<any> = err.response.data.message;
          array.forEach((val) => {
            alerts.push({ message: val });
          });
        } else {
          alerts.push({ message: err.response.data.message });
        }

        this.setState({ alerts: alerts });

        this.resetAlert();
      });
  };

  private resetProgress() {
    this.setState({ progress: { isShow: false } });
  }

  private resetAlert() {
    setTimeout(() => {
      this.setState({ alerts: [] });
    }, 5000);
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Card className="w-50 mx-auto">
              <Card.Body>
                <Card.Title className="text-center">Register</Card.Title>
                {this.state.progress.isShow ? <ProgressBar animated now={45} /> : null}

                {this.state.alerts.map((item) => (
                  <Alert key={Math.random()} variant="danger">
                    {item.message}
                  </Alert>
                ))}

                <Form className="mt-3" onSubmit={this.handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" name="name" />
                  </Form.Group>

                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" name="username" />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" name="password" />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="confirmPassword" name="confirmPassword" />
                  </Form.Group>

                  <Button type="submit" variant="primary w-50 mx-auto" block>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
