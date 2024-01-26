import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';

const ReservationCard = ({ reservation }) => {
    return <Card key={reservation.id} style={{
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
    </Card>;
};

export default ReservationCard;
