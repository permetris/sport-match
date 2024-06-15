import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MatchItem } from './MatchItem';
import { toastError } from '../../hooks/useToastify';

import { useLocation } from 'react-router-dom';

export const Match = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [match, setMatch] = useState();

  useEffect(() => {


    return () => {
      // cleanup
    };
  }, []);
  return (
    <Container className='rounded'>
      {match &&
         <MatchItem className='mt-5 shadow' match={match} key={match._id}></MatchItem>
      }
    </Container>
  );
};
