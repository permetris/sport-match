import React from 'react';
import { Container, Paper } from '@mui/material';

export const Wrapper = (props) => {
  return (
    <Container style={{ height: '100%', width: '100%', overflow: 'hidden', marginTop: '53px' }}>
      <Paper elevation={6} style={{ padding: 20, height: '100%' }}>
        {props.children}
      </Paper>
    </Container>
  );
};
