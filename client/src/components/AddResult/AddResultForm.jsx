import React from 'react';
import { Col, Button, Row, Container, Card, Form, InputGroup } from 'react-bootstrap';

export const AddResultForm = (props) => {
  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xs={12}>
          <div className='border border-3 border-primary'></div>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-5 mt-md-4'>
                <h2 className='fw-bold mb-5 text-center'>Add Match Results</h2>
                <div className='mb-3'>
                  <Form onSubmit={props.handleSubmit}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>Enter Scores</InputGroup.Text>
                      <Form.Control
                        aria-label='blackTeamScore'
                        type='number'
                        required
                        min={0}
                        max={12}
                        placeholder='Black Team Score'
                        name='blackTeamScore'
                        value={props.formData.blackTeamScore}
                        onChange={props.handleChange}
                      />
                      <Form.Control
                        aria-label='whiteTeamScore'
                        required
                        type='number'
                        min={0}
                        max={12}
                        placeholder='White Team Score'
                        name='whiteTeamScore'
                        value={props.formData.whiteTeamScore}
                        onChange={props.handleChange}
                      />
                    </InputGroup>

                    <div className='d-grid mt-4'>
                      <Button variant='primary' type='submit'>
                          Submit Result
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
