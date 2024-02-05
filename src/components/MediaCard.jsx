import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({flag, countryName}) {
  return (
    <Card sx={{ width:'full' }}>
      <CardMedia
        sx={{ maxHeight: 140, objectFit:'cover' }}
        component={'img'}
        src={flag}
        title={`flag of ${countryName}`}
      />
      <CardContent sx={{height:60}}>
        <Typography gutterBottom variant="h5" component="div">
          {countryName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Click to see more!</Button>
      </CardActions>
    </Card>
  );
}