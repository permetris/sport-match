import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

export const MatchItem = (props) => {
  const { match, field } = props;

  return (
    <Container className='mt-3 mb-3 ms-7 bg-body rounded shadow'>
      {
        field && <Row><h4 className='text-primary text-center mt-2'>{ field.name}</h4></Row>
      }

      <Row>
        <Col xs={ 5 } className='align-item-center justify-content-center'>
          <Row><h4 className='text-primary text-center mt-2'>Black Team</h4></Row>
          <ListGroup className='align-items-center justify-content-center' variant='flush'>
            {match.blackTeam.players.map(player => <ListGroup.Item key={ player._id}>{player.isDeleted ? 'Deleted User' : player.username}</ListGroup.Item>)}
          </ListGroup>
        </Col>
        <Col xs={2} className='md-auto d-flex align-items-center justify-content-center'> <p>{`${match.result.blackTeamScore}  -  ${match.result.whiteTeamScore}`}</p></Col>
        <Col xs={ 5 } className=' align-items-center justify-content-center'>
          <Row><h4 className='text-primary text-center mt-2'>White Team</h4></Row>
          <ListGroup className='align-items-center justify-content-center' variant='flush'>
            {match.whiteTeam.players.map(player => <ListGroup.Item key={ player._id}>{player.isDeleted ? 'Deleted User' : player.username}</ListGroup.Item>)}
          </ListGroup>
        </Col>
      </Row>
    </Container>);
};
