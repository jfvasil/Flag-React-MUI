import {Typography, Grid, Box, Button} from '@mui/material'
import {styled} from '@mui/material/styles'
import { useState } from 'react'

const CustomSpan = styled('span')(({theme}) => ({
  color:theme.palette.secondary.dark,
  fontWeight:'bold'
}))

const InfoDisplay = ({capital,population,continent,languages,name,showName = true}) => {

const [aiOverview, setAiOverview] = useState("");
const [loadingOverview, setLoadingOverview] = useState(false);

async function getAiOverview(country) {
  setLoadingOverview(true);
  setAiOverview("");

  try {
    const res = await fetch("/.netlify/functions/countryOverview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country }),
    });

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to generate overview");
    }

    setAiOverview(data.overview)
  } catch (error) {
    setAiOverview("Sorry, I could not generate an overview right now.");
  } finally {
    setLoadingOverview(false)
  }
}

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
    <Grid item>
      <Button size="large" onClick={() => getAiOverview(name)}>
        Ai Overview!
        </Button>
        {loadingOverview && 
        <CustomSpan>Generating Ai Overview....</CustomSpan> }
        {aiOverview && (
          <Grid item>
            {aiOverview}
          </Grid>
        )}
    </Grid>
   </Grid>
   </Typography>
  )
}

export default InfoDisplay