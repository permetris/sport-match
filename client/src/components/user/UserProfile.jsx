
import React, { useState, useEffect } from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';
import { httpGetUser, httpUpdateUser } from '../../hooks/requests';
import { useToastifyError, useToastifySuccess } from '../../hooks/useToastify';
import { successMessages } from '../../utils/responseMessages';
import { UserInfo } from './UserInfo';

export const UserProfile = () => {
  const userId = localStorage.getItem('userid');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const editUser = async (editedUser) => {
    try {
      const { data } = await httpUpdateUser(localStorage.getItem('userid'), editedUser);
      setUser({ ...data.data });
      useToastifySuccess(successMessages.userUpdated);
    } catch (err) {
      useToastifyError(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userResponse = await httpGetUser(userId);
        setIsLoading(false);
        setUser(userResponse.data.data);
      } catch (err) {
        setIsLoading(false);
        useToastifyError(err);
      }
    };
    getData();
    return () => {
      // cleanup
    };
  }, []);

  return <Container className='align-items-center justify-content-center'>
    {!isLoading && <UserInfo user={user} editUser={editUser} />}
    <Row className='vh-100 justify-content-center align-content-center'>
      {isLoading && <Spinner animation='border' variant='primary' />}

    </Row>

  </Container>;
};
