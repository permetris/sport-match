import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { toastError } from '../../hooks/useToastify';
import { Wrapper } from '../../components/Wrapper/index';
import { Container } from '@mui/material';
import { ReservationCard } from '../../components/Reservation/ReservationCard';

export const Home = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_SERVER_URL}/reservation`)
        ]);
        const reservations = reservationsResponse.data;
        setReservations(reservations);
      } catch (err) {
        toastError(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <h2>Available sport events</h2>
      <Container
        elevation={20}
        sx={{ p: 1, display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', flexDirection: 'row', gap: 2 }}>
        {reservations.map(reservation => <ReservationCard key={reservation.id} reservation={reservation} />)}
      </Container>
    </Wrapper >
  );
};
