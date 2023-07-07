import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MatchItem } from './MatchItem';
import { useToastifyError } from '../../hooks/useToastify';
import { httpGetMatch } from '../../hooks/requests';
import { useLocation } from 'react-router-dom';

export const Match = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [match, setMatch] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await httpGetMatch(id);
        setMatch(data.data);
      } catch (e) {
        useToastifyError(e);
      }
    };
    getData();

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
