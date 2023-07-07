import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MatchItem } from '../../match/MatchItem';
import { httpGetUserHistory } from '../../../hooks/requests';
import { useToastifyError } from '../../../hooks/useToastify';

export const UserHistory = () => {
  const userId = localStorage.getItem('userid');
  const [history, setHistory] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await httpGetUserHistory(userId);

        setHistory(data);
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
      {history && history.map(item => {
        return <MatchItem className='mt-5 shadow' match={item.match} key={item._id} field={item.field}></MatchItem>;
      })}
    </Container>
  );
};
