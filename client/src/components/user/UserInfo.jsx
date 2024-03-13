import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { EditForm } from './UserEditForm';
import { useGetUserQuery } from '../../api/slice';

export const UserInfo = () => {
  const userId = localStorage.getItem('userid');
  const { data: user, isLoading } = useGetUserQuery(userId);

  if (isLoading) { return <h1>Loading</h1>; }

  return (
    <Container>
      <h1 className='my-3'>User information</h1>
      <Card className='shadow'>
        <Card.Body>
          <EditForm user={user.data} />
        </Card.Body>
      </Card>
    </Container>
  );
};
