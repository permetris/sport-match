/* eslint-disable indent */
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { AccessTimeFilledOutlined, LocationOn } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import PlaceholderImage from '../../../images/placeholder.png';
import { isLoggedIn } from '../../../utils/isLoggedIn';

const ReservationCard = ({ reservation, enrollSelf }) => {
    return <Card style={{
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
            {isLoggedIn() && <Button variant='contained' disabled={false} onClick={enrollSelf(reservation._id)}>Enroll</Button>}
        </CardActions>
    </Card>;
};

export default ReservationCard;
