import React, { Component, Fragment, SyntheticEvent } from 'react';
import { Container, Row, Col, Card, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import moment from 'moment';
import { NavbarComp, PostComp, PostProps } from '../../../components';
import { AxiosService } from '../../../helpers/AxiosService';

interface HomeState {
  progress: {
    isShow: boolean;
  };
  alert: {
    isShow: boolean;
    message: string;
    variant: string;
  };
  timeInterval?: NodeJS.Timeout;
  time: string;
  posts: Array<PostProps>;
}

export class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progress: {
        isShow: false,
      },
      alert: {
        isShow: false,
        message: '',
        variant: '',
      },
      time: '',
      posts: [],
    };
  }

  componentDidMount() {
    // time
    const time = setInterval(() => {
      this.setState({
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }, 1000);
    this.setState({ timeInterval: time });

    // posts
    this.getPosts();
  }

  componentWillUnmount() {
    if (this.state.timeInterval) {
      clearInterval(this.state.timeInterval);
    }
  }

  getPosts() {
    AxiosService.get('/posts').then((res) => {
      const array = res.data.data as Array<any>;
      const posts: Array<PostProps> = [];
      array.forEach((val) => {
        posts.push({
          name: val.name,
          time: val.createdAt,
          post: val.post,
        });
      });

      this.setState({ posts: posts });
    });
  }

  handleSubmit = (event: SyntheticEvent) => {
    // prevent reload
    event.preventDefault();

    const post = document.querySelector('[name="post"]') as HTMLTextAreaElement;

    // show progress
    this.setState({ progress: { isShow: true } });

    AxiosService.post('/posts', { post: post.value })
      .then((res) => {
        this.setState({
          alert: {
            isShow: true,
            variant: 'success',
            message: res.data.message,
          },
        });

        this.resetProgress();
        this.resetAlert();

        post.value = '';
        this.getPosts();
      })
      .catch((err) => {
        this.setState({
          alert: {
            isShow: true,
            variant: 'danger',
            message: err.response.data.message,
          },
        });

        this.resetProgress();
        this.resetAlert();
      });
  };

  private resetProgress() {
    this.setState({ progress: { isShow: false } });
  }

  private resetAlert() {
    setTimeout(() => {
      this.setState({ alert: { isShow: false, variant: '', message: '' } });
    }, 5000);
  }

  render() {
    return (
      <Fragment>
        <NavbarComp />
        <Container className="mt-5">
          <Row>
            <Col md={6} className="mx-auto">
              <Card>
                <Card.Body>
                  {this.state.progress.isShow ? <ProgressBar animated now={100} /> : null}

                  {this.state.alert.isShow ? (
                    <Alert variant={this.state.alert.variant}>{this.state.alert.message}</Alert>
                  ) : null}

                  <Card.Title>What's happening today ? </Card.Title>
                  <p className="small text-right">{this.state.time}</p>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Control as="textarea" rows={3} name="post" />
                    </Form.Group>

                    <Button type="submit" variant="info" block>
                      Post
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {this.state.posts.map((val) => (
            <PostComp key={Math.random()} name={val.name} time={val.time} post={val.post} />
          ))}
        </Container>
      </Fragment>
    );
  }
}
