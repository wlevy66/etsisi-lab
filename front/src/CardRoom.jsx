import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


const CardRoom = ({room}) => {



    return (
        <Card sx={{ minWidth: 275 }} key={room._id}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {room.name}
            </Typography>
            <Typography variant="h5" component="div">
                {room.capacity}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/add-reservation/${room._id}`}>
              <Button size="small" onClick={()=> console.log(room._id)}>Reservar</Button>
            </Link>
          </CardActions>
        </Card>
      );
}



export default CardRoom