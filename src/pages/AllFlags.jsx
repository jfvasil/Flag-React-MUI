import {Grid, CircularProgress,Box} from '@mui/material'
import MediaCard from '../components/MediaCard'
import Header from '../components/Header'
import axios from 'axios'
import { useState,useCallback,useEffect } from 'react'
import { Link } from 'react-router-dom'

const AllFlags = () => {

   const [countries, setCountries] = useState([])
   const [isLoading, setIsLoading] = useState(false)

    const handleFetch = async () => {
        setIsLoading(true)
        try{
            

            const res = await axios.get('https://restcountries.com/v3.1/all')
            
            
            // const flagsArray = data.map(country => country.flags.png)
            // const namesArray = data.map(country => country.name.common)
            setCountries(res.data)
            console.log(countries)
            // setFlags(flagsArray)
            // setCountryNames(namesArray)
        }catch(err){
            console.error(err)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        
        handleFetch()
    },[])

  return (
    <>
    <Header />
    {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection:'column', 
        justifyContent:'center', alignItems:'center', 
        width:'full', height:'full'}}>
        <CircularProgress />
      </Box>
    ) : (
    <Grid container 
    spacing={2} sx={{padding: 2}}>
    {countries.map(country => (
        <Grid item 
         xs={12} sm={6} md={4} lg={3} xl={2}
        key={country.cca2}>
            <Link to={`/flag/${country.cca2}`}
            style={{textDecoration: 'none'}}>
            <MediaCard
            flag={country.flags.png}
            countryName={country.name.common}
            />
            </Link>
        </Grid>

    ))}
    </Grid>
    )}
    </>
  )
}

export default AllFlags