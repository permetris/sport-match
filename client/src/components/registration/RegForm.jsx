import React from 'react';
import { Col, Button, Row, Container, Card, Form, InputGroup, FloatingLabel } from 'react-bootstrap';

export const RegForm = (props) => {
  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xs={12}>
          <div className='border border-3 border-primary'></div>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-5 mt-md-4'>
                <h2 className='fw-bold mb-5 text-center'>Register</h2>
                <div className='mb-3'>
                  <Form onSubmit={props.handleSubmit}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>First and last name</InputGroup.Text>
                      <Form.Control
                        aria-label='name'
                        type='text'
                        required
                        minLength={3}
                        maxLength={25}
                        pattern='/^[a-zA-Z]+$/'
                        placeholder='Enter first name'
                        name='name'
                        value={props.formData.name}
                        onChange={props.handleChange}
                      />
                      <Form.Control
                        aria-label='surname'
                        type='text'
                        required
                        minLength={3}
                        maxLength={25}
                        pattern='/^[a-zA-Z]+$/'
                        placeholder='Enter last name'
                        name='surname'
                        value={props.formData.surname}
                        onChange={props.handleChange}
                      />
                    </InputGroup>
                    <FloatingLabel
                      label='Username'
                      className='mb-3'
                      controlId='formBasicUsername'
                    >
                      <Form.Control
                        type='text'
                        placeholder='Enter username'
                        name='username'
                        required
                        minLength={4}
                        maxLength={16}
                        value={props.formData.username}
                        onChange={props.handleChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      label='Email Address'
                      className='mb-3'
                      controlId='formBasicEmail'>

                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        required
                        value={props.formData.email}
                        onChange={props.handleChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      label='Password'
                      className='mb-3'
                      controlId='formBasicPassword'
                    >
                      <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        name='password'
                        required
                        minLength={8}
                        maxLength={20}
                        value={props.formData.password}
                        onChange={props.handleChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      label='Phone Number'
                      className='mb-3'
                      controlId='formBasicPhone'>
                      <Form.Control
                        type='tel'
                        placeholder='Enter phone number'
                        name='phone'
                        required
                        value={props.formData.phone}
                        onChange={props.handleChange}
                      />
                    </FloatingLabel>
                    <div className='d-grid'>
                      <Button variant='primary' type='submit'>
                          Register
                      </Button>
                    </div>
                  </Form>
                  <div className='mt-3'>
                    <p className='mb-0  text-center'>
                        Already have an account?{' '}
                      <a href='/login' className='text-primary fw-bold'>
                          Log in
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
