import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { useToastifyError } from '../../hooks/useToastify';
import PlaceholderImage from '../../images/placeholder.png';
import PeopleIcon from '@mui/icons-material/People';
import { Wrapper } from '../../components/Wrapper/index';
import { AccessTimeFilledOutlined, LocationOn } from '@mui/icons-material';
import { CardActions, CardContent, CardMedia, Typography, Container, Card, Button } from '@mui/material';

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
        useToastifyError(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <h2>Available sport events</h2>
      <Container
        elevation={20}
        sx={{ p: 1, display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', flexDirection: 'row', gap: 2 }}
      >
        {reservations.map(reservation => {
          return (
            <Card key={reservation.id} style={{
              flex: 1, flexBasis: 'auto', maxWidth: '40%', minWidth: '25%'
            }} >
              <CardMedia
                sx={{ height: 250 }}
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
                <Button variant='contained'>Enroll</Button>
                <Button variant='outlined' color='secondary' size="medium">Details</Button>
              </CardActions>
            </Card>);
        })}
      </Container>
    </Wrapper>
  );
};
