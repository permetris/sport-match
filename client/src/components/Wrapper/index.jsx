import React from 'react';
import { Container } from 'react-bootstrap';

export const Wrapper = (props) => {
  return <Container style={{ height: '100vh', width: '100%', overflow: 'hidden', marginTop: '80px' }}>{props.children}</Container>;
};
