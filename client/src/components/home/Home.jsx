import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { Button, Container, Card } from 'react-bootstrap';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { Link } from 'react-router-dom';
import { useToastifyError } from '../../hooks/useToastify';

export const Home = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationsResponse, fieldsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_SERVER_URL}/reservation`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/field`)
        ]);

        const reservations = reservationsResponse.data.data
          .filter(reservation => !reservation.isFinished && !reservation.isCanceled)
          .map(reservation => {
            const field = fieldsResponse.data.data.find(field => field._id === reservation.field);
            return {
              ...reservation,
              field: field.name,
              maxPlayers: field.maxPlayers
            };
          });

        setReservations(reservations);
      } catch (err) {
        useToastifyError(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className='container'>
      <h1 className='my-3'>All Reservations</h1>
      <Card className='shadow'>
        <Card.Body>
          <div>
            <ul className='list-group'>
              {reservations.map(reservation => (
                <li key={reservation._id} className='list-group-item'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <p className='mb-1'><strong>Field:</strong> {reservation.field}</p>
                      <p className='mb-1'><strong>Number of registered players:</strong> {reservation.registeredPlayers.length}</p>
                      <p className='mb-1'><strong>Time:</strong> {new Date(reservation.time).toLocaleString()}</p>
                      <p className='mb-1'><strong>Max players for this field:</strong> {reservation.maxPlayers}</p>
                    </div>
                    {isLoggedIn() && (
                      <div className='d-grid'>
                        <div className='d-grid'>
                          <Link to={`/reservation/${reservation._id}`} className='mt-5 mb-5 h-25'>
                            <Button variant='primary' type='submit'>
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
