import React from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';
import { UserInfo } from './UserInfo';
import { isLoggedIn } from '../../utils/isLoggedIn';

export const UserProfile = () => {
  if (!isLoggedIn) {
    return <h1>Not logged in!</h1>;
  }

  return (
    <Container className='align-items-center justify-content-center'>
      {!isLoading && <UserInfo user={user.data} />}
      <Row className='vh-100 justify-content-center align-content-center'>
        {isLoading && <Spinner animation='border' variant='primary' />}
      </Row>
    </Container>
  );
};
