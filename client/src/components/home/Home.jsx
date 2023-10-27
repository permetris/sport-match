import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { Button, Container, Card } from 'react-bootstrap';
import { useToastifyError } from '../../hooks/useToastify';
import PlaceholderImage from '../../images/placeholder.png';
import PeopleIcon from '@mui/icons-material/People';

import { AccessTimeFilledOutlined, LocationOn } from '@mui/icons-material';
import { CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';

export const Home = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_SERVER_URL}/reservation`)
        ]);
        console.log(reservationsResponse.data);
        const reservations = reservationsResponse.data;
        console.log(reservations);
        setReservations(reservations);
      } catch (err) {
        useToastifyError(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Paper style={{ padding: 20, minHeight: '100%', overflowY: 'scroll' }}>
        <h1>Reservation</h1>
        <Container elevation={3} style={{ padding: 20, marginTop: 20, paddingLeft: 0, paddingRight: 0, display: 'flex', flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {reservations.map(reservation => {
            return (
              <Card key={reservation.id} style={{ flex: 1, flexBasis: 'auto', minWidth: 'calc(33% - 16px)', maxWidth: 'calc(50% - 16px)' }} >
                <CardMedia
                  sx={{ height: 250, minWidth: 'calc(33% - 16px)' }}
                  image={PlaceholderImage}
                  title={reservation.field?.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {reservation.field.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <LocationOn /> {`${reservation.field?.city}, ${reservation.field?.address}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <AccessTimeFilledOutlined /> {new Date(reservation.time).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <PeopleIcon /> {reservation?.registeredPlayers.length}/{reservation.field.maxPlayers}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>);
          })}
        </Container>
      </Paper >
    </Container>
  );
};
