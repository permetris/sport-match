import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { EditForm } from './UserEditForm';

export const UserInfo = (PropTypes) => {
  return (
    <Container>
      <h1 className='my-3'>User information</h1>
      <Card className='shadow'>
        <Card.Body>
          <EditForm user={ PropTypes.user } editUser={PropTypes.editUser} />
        </Card.Body>
      </Card>
    </Container>
  );
};
