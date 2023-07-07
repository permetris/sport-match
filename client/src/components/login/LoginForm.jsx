/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Col, Button, Row, Container, Card, Form, FloatingLabel } from 'react-bootstrap';

export const LoginForm = (props) => {
  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xs={12}>
          <div className='border border-3 border-primary'>
          </div>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-5 mt-md-4'>
                <h2 className='fw-bold mb-5 text-center'>Welcome</h2>
                <div className='mb-3'>
                  <Form onSubmit={props.handleSubmit}>
                    <FloatingLabel label='Email address' className='mb-3' controlId='formBasicEmail'>
                      <Form.Control
                        type='email'
                        required
                        name='email'
                        onChange={props.handleChange}
                        placeholder='Enter email' />
                    </FloatingLabel>

                    <FloatingLabel
                      label='Password'
                      className='mb-3'
                      controlId='formBasicPassword'
                    >

                      <Form.Control
                        type='password'
                        required
                        minLength={8}
                        maxLength={20}
                        name='password'
                        onChange={props.handleChange}
                        placeholder='Password' />
                    </FloatingLabel>
                    <Form.Group
                      className='mb-3'
                      controlId='formBasicCheckbox'
                    >
                      <p className='small'>
                        <a className='text-primary' href='/forgotten-password'>
                            Forgot password?
                        </a>
                      </p>
                    </Form.Group>
                    <div className='d-grid'>
                      <Button variant='primary' type='submit'>
                          Login
                      </Button>
                    </div>
                  </Form>
                  <div className='mt-3'>
                    <p className='mb-0  text-center'>
                        Don't have an account?{' '}
                      <a href='/register' className='text-primary fw-bold'>
                          Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
