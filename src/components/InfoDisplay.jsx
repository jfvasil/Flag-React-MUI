import {Typography, Grid, Box} from '@mui/material'

const InfoDisplay = ({capital,population,continent,languages,name}) => {


    const wikiURL = 'https://en.wikipedia.org/wiki/'

  return (
    <Typography variant='h4' component='p'>
   <Grid container
   spacing={1.5}
   direction='column'
   alignItems='center'>
    <Grid item> {name} </Grid>
    <Grid item>Capital: {capital} </Grid>
    <Grid item>Population: {population}</Grid>
    <Grid item>Continent: {continent}</Grid>
    <Grid item>Language(s): {languages}</Grid>
    <Grid item>Find more info on:
    <a href={wikiURL + name}> Wikipedia</a></Grid>
   </Grid>
   </Typography>
  )
}

export default InfoDisplay