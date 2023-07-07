import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { useToastifyError, useToastifySuccess } from '../../hooks/useToastify';
import { successMessages } from '../../utils/responseMessages';

export const Navigation = () => {
  const navigate = useNavigate();
  const onLogoutHandler = async (e) => {
    try {
      e.preventDefault();

      localStorage.clear();
      useToastifySuccess(successMessages.userLoggedOut);
      navigate('/');
    } catch (err) {
      useToastifyError(err);
    }
  };

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Sports Matches Organizer</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' >
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              {!isLoggedIn() && <Nav.Link href='/login'>Log In</Nav.Link>}
              {!isLoggedIn() && <Nav.Link href='/register'>Register</Nav.Link>}
              {isLoggedIn() && <Nav.Link href='/user'>My Profile</Nav.Link>}
              {isLoggedIn() && <Nav.Link href='/history'>Match History</Nav.Link>}
              {isLoggedIn() && <Nav.Link onClick={onLogoutHandler} href='/'>Logout</Nav.Link>}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
