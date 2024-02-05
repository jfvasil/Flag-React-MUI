import {Typography, Grid, Box} from '@mui/material'
import {styled} from '@mui/material/styles'

const CustomSpan = styled('span')(({theme}) => ({
  color:theme.palette.secondary.dark,
  fontWeight:'bold'
}))

const InfoDisplay = ({capital,population,continent,languages,name,showName = true}) => {


    const wikiURL = 'https://en.wikipedia.org/wiki/'

  return (
    <Typography variant='body1' component='div' sx={{mt: 2}}>
   <Grid container
   spacing={1.5}
   direction='column'
   alignItems='center'
   sx={{color:'primary.main', fontSize:1.7 + 'em'}}>
    {showName && (
    <Grid item > {name} </Grid>)}
    <Grid item>
     <CustomSpan> Capital: </CustomSpan>
      {capital} </Grid>
    <Grid item>
      <CustomSpan>Population:</CustomSpan> 
      {population}</Grid>
    <Grid item>
      <CustomSpan>Continent: </CustomSpan>{
      continent}</Grid>
    <Grid item>
      <CustomSpan sx={{display:'inline-flex', flexWrap:'wrap'}}>Language(s)</CustomSpan>:
       {languages}</Grid>
    <Grid item>
    <CustomSpan>Find more info on:</CustomSpan>    
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