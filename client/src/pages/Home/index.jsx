import { React } from 'react';
import { Wrapper } from '../../components/Wrapper/index';
import { Container } from '@mui/material';
import ReservationCard from '../../components/Reservation/ReservationCard';
import { useGetReservationsQuery } from '../../api/slice';

// import { httpAddPlayerToReservation } from '../../hooks/addPlayer';

export const Home = () => {
  const { data: response, isLoading, isSuccess } = useGetReservationsQuery();
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <Wrapper>
      <h2>Available sport events</h2>
      <Container
        elevation={20}
        sx={styles.container}>
        {response.map(reservation => <ReservationCard key={reservation._id} reservation={reservation} />)}
      </Container>
    </Wrapper >
  );
};

const styles = {
  container: {
    p: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 2
  }
};
