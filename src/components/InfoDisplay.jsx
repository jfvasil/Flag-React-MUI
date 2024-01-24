import {Typography, Grid, Box} from '@mui/material'

const InfoDisplay = ({capital,population,continent,languages,name,showName = true}) => {


    const wikiURL = 'https://en.wikipedia.org/wiki/'

  return (
    <Typography variant='body1' component='div' sx={{mt: 2}}>
   <Grid container
   spacing={1.5}
   direction='column'
   alignItems='center'>
    {showName && (
    <Grid item> {name} </Grid>)}
    <Grid item>Capital: {capital} </Grid>
    <Grid item>Population: {population}</Grid>
    <Grid item>Continent: {continent}</Grid>
    <Grid item>Language(s): {languages}</Grid>
    <Grid item>
    Find more info on:    
    <a href={wikiURL + name} 
    target='_blank'
    sx={{ color: 'secondary.main'}}
    > 
    Wikipedia</a></Grid>
   </Grid>
   </Typography>
  )
}

export default InfoDisplay