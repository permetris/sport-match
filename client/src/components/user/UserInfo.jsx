import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { EditForm } from './UserEditForm';
import { useGetUserQuery } from '../../api/slice';
import { useParams } from 'react-router-dom';

export const UserInfo = () => {
  const { username } = useParams();
  const { data, isLoading } = useGetUserQuery(username);

  if (isLoading) { return <h1>Loading</h1>; }

  return (
    <Container>
      <h1 className='my-3'>User information</h1>
      <Card className='shadow'>
        <Card.Body>
          <EditForm user={data.data} />
        </Card.Body>
      </Card>
    </Container>
  );
};
