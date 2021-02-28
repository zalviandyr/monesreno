import React, { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import { AxiosService, UserData } from '../../../helpers';

interface MyState {
  alert: {
    isShow: boolean;
    message: string;
  };
  progress: {
    isShow: boolean;
  };
}

export class Login extends Component<RouteComponentProps, MyState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      alert: {
        isShow: false,
        message: '',
      },
      progress: {
        isShow: false,
      },
    };
  }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const username = document.querySelector('[name="username"]') as HTMLInputElement;
    const password = document.querySelector('[name="password"]') as HTMLInputElement;

    const postData = {
      username: username.value,
      password: password.value,
    };

    // show progress
    this.setState({ progress: { isShow: true } });

    AxiosService.post('/users/login', postData)
      .then((res) => {
        UserData.setToken(res.data.data.token);

        this.props.history.push('/');
      })
      .catch((err) => {
        this.resetProgress();

        this.setState({
          alert: {
            isShow: true,
            message: err.response.data.message,
          },
        });

        this.resetAlert();
      });
  };

  private resetProgress() {
    this.setState({ progress: { isShow: false } });
  }

  private resetAlert() {
    setTimeout(() => {
      this.setState({ alert: { isShow: false, message: '' } });
    }, 5000);
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Card className="w-50 mx-auto">
              <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                {this.state.progress.isShow ? <ProgressBar animated now={100} /> : null}

                {this.state.alert.isShow ? <Alert variant="danger">{this.state.alert.message}</Alert> : null}

                <Form className="mt-3" onSubmit={this.handleSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" name="username" />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" name="password" />
                  </Form.Group>

                  <Button type="submit" variant="primary w-50 mx-auto" block>
                    Login
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
