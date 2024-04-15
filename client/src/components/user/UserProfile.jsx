import React from 'react';
import { Container } from 'react-bootstrap';
import { UserInfo } from './UserInfo';
import { isLoggedIn } from '../../utils/isLoggedIn';

export const UserProfile = () => {
  if (!isLoggedIn()) {
    return <h1>Not logged in!</h1>;
  }

  return (
    <Container className='align-items-center justify-content-center'>
      <UserInfo />
    </Container>
  );
};
