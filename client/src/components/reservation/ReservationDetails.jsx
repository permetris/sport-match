import { useEffect, React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { useToastifyError } from '../../hooks/useToastify';
import { httpGetReservation } from '../../hooks/requests';
import { handleAddPlayerClick } from '../../hooks/addPlayer';
import { handleRemovePlayerClick } from '../../hooks/removePlayer';

export const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isPlayerRegistered, setPlayerRegistered] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpGetReservation(id);
        setReservation(data);
      } catch (err) {
        useToastifyError(err);
      }
    };
    fetchData();
    setIsLoaded(true);

    return () => {
      // cleanup
    };
  }, [isPlayerRegistered]);

  const handleAddPlayer = () => {
    handleAddPlayerClick(id, setPlayerRegistered);
  };

  const handleRemovePlayer = () => {
    handleRemovePlayerClick(id, setPlayerRegistered);
  };

  if (!isLoggedIn()) {
    return <div>You need to be logged in to view this page!</div>;
  }
  return (
    <Container className='container'>
      <h1 className='my-3'>Reservation Details</h1>
      <Card className='shadow'>
        <Card.Body>
          {!isLoaded && <h1>Loading</h1>}
          {isLoaded && (
            <div>
              <p className='mb-2'><strong>Field Name:</strong> {reservation.field?.name}</p>
              <p className='mb-2'><strong>Field Address:</strong> {reservation.field?.address}</p>
              <p className='mb-2'><strong>Field City:</strong> {reservation.field?.city}</p>
              <p className='mb-2'><strong>Number of registered players:</strong> {reservation.registeredPlayers?.length || 0}</p>
              <p className='mb-2'><strong>Time of the reservation:</strong> {new Date(reservation.time)?.toLocaleString()}</p>
              <p className='mb-2'><strong>Max players for this field:</strong> {reservation.field?.maxPlayers}</p>
              <p className='mb-2'>
                <strong>Registered players usernames:</strong>{' '}
                {reservation.registeredPlayers?.map((player) => player.username).join(', ')}
              </p>
              { !isPlayerRegistered && <Button className='mt-3 mb-3 me-3' onClick={handleAddPlayer}>Play in this match</Button>}
              { isPlayerRegistered && <Button className='mt-3 mb-3' onClick={handleRemovePlayer}>Withdraw</Button>}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
