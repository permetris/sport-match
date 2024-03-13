import React, { useEffect } from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';
import { httpGetUser, httpUpdateUser } from '../../hooks/requests';
import { toastError, toastSuccess } from '../../hooks/useToastify';
import { successMessages } from '../../utils/responseMessages';
import { UserInfo } from './UserInfo';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { useGetUserQuery } from '../../api/slice';

export const UserProfile = () => {
  const userId = localStorage.getItem('userid');

  const { data: user, isLoading } = useGetUserQuery();

  const editUser = async (editedUser) => {
    try {
      const { data } = await httpUpdateUser(localStorage.getItem('userid'), editedUser);
      setUser({ ...data.data });
      toastSuccess(successMessages.userUpdated);
    } catch (err) {
      toastError(err);
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
        toastError(err);
      }
    };
    getData();
    return () => {
      // cleanup
    };
  }, []);
  if (!isLoggedIn) {
    return <h1>Not logged in!</h1>;
  }

  return <Container className='align-items-center justify-content-center'>
    {!isLoading && <UserInfo user={user} editUser={editUser} />}
    <Row className='vh-100 justify-content-center align-content-center'>
      {isLoading && <Spinner animation='border' variant='primary' />}

    </Row>

  </Container>;
};
