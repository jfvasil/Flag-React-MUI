import Grid from '@mui/material/Grid'
import MediaCard from '../components/MediaCard'
import axios from 'axios'
import { useState,useCallback,useEffect } from 'react'
import { Link } from 'react-router-dom'

const AllFlags = () => {

   const [countries, setCountries] = useState([])

    const handleFetch = async () => {
    
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
        }
    }

    useEffect(() => {
        handleFetch()
    },[])

  return (
    <Grid container spacing={2}>
    {countries.map(country => (
        <Grid item key={country.cca2}>
            <Link to={`/flag/${country.cca2}`}>
            <MediaCard
            flag={country.flags.png}
            countryName={country.name.common}
            />
            </Link>
        </Grid>

    ))}
    </Grid>
  )
}

export default AllFlags