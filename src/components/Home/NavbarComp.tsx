import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { AxiosService } from '../../helpers';

export class NavbarComp extends Component<{}, { name: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    AxiosService.get('/users').then((res) => {
      this.setState({ name: res.data.data.name });
    });
  }

  render() {
    return (
      <Navbar sticky="top" expand="lg" bg="info" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Social - Monesreno</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{this.state.name}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
