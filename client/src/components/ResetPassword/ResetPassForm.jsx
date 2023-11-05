/* eslint-disable react/no-unescaped-entities */
import { Col, Button, Row, Container, Card, Form, FloatingLabel } from 'react-bootstrap';
import React from 'react';

export const ResetPasswordForm = (props) => {
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
                  <h2 className='fw-bold mb-5 text-center'>Reset Password</h2>
                  <div className='mb-3'>
                    <Form onSubmit={props.handleSubmit}>
                      <FloatingLabel
                        label='New Pasword'
                        className='mb-3'
                        controlId='formBasicPassword'
                      >

                        <Form.Control type='password' name='password' onChange={props.handleChange} placeholder='Password' />
                      </FloatingLabel>
                      <FloatingLabel
                        label='Confirm Password'
                        className='mb-3'
                        controlId='formConfirmPassword'
                      >

                        <Form.Control type='password' name='confirmPassword' onChange={props.handleChange} placeholder='Re-enter Password' />
                      </FloatingLabel>

                      <div className='d-grid'>
                        <Button variant='primary' type='submit'>
                          Reset Password
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
    </div>
  );
};
