/* eslint-disable react/no-unescaped-entities */
import { Col, Button, Row, Container, Card, Form, FloatingLabel } from 'react-bootstrap';
import React from 'react';

export const EmailForm = (props) => {
  return (
    <div>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div className='border border-3 border-primary'>
            </div>
            <Card className='shadow'>
              <Card.Body>
                <div className='mb-5 mt-md-4'>
                  <h2 className='fw-bold mb-5 text-center'>Forgot your password?</h2>
                  {props.data && <div className='alert alert-success'>{props.data.message}</div>}
                  <div className='mb-3'>
                    <Form onSubmit={props.handleSubmit}>
                      <Form.Label>Enter your email and we'll send you a link to reset your password.</Form.Label>
                      <FloatingLabel
                        className='mb-5'
                        controlId='formBasicEmail'
                        label='Email Address'
                      >
                        <Form.Control
                          type='email'
                          name='email'
                          onChange={props.handleChange}
                          placeholder='Account Email' />
                      </FloatingLabel>
                      <div className='d-grid'>
                        <Button variant='primary' type='submit'>
                            Send Reset Link
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
    </div>);
};
