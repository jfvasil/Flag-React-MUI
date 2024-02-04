import {Grid, CircularProgress,Box,FormControl,InputLabel,Select,MenuItem} from '@mui/material'
import MediaCard from '../components/MediaCard'
import Header from '../components/Header'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const AllFlags = () => {

   const [countries, setCountries] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [filterContinent, setFilterContinent] = useState('')
   const [sortOrder, setSortOrder] = useState('asc')

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

   
const filteredCountries = countries.filter(country => 
    filterContinent ? country.region === filterContinent : true
  )
  
  const sortedCountries = filteredCountries.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.name.common.localeCompare(a.name.common);
    }
  })
  

  return (
    <>
    <Header />
    {isLoading ? (
        <Box sx={{display: 'flex', flexDirection:'column', 
        justifyContent:'center', alignItems:'center', 
       height:'100vh'}}>
        <CircularProgress size={110} />
      </Box>
    ) : (
    <Grid container 
    spacing={2} sx={{padding: 2}}>
<Box sx={{ my: 4, display: 'flex', justifyContent: 'center', gap: 4 }}>
  <FormControl variant='outlined' sx={{minWidth:120}}>
  <InputLabel>Continent</InputLabel>
  <Select
    label='Continent'
    value={filterContinent}
    onChange={(e) => setFilterContinent(e.target.value)}
    displayEmpty
  >
    <MenuItem value="">All Continents</MenuItem>
    <MenuItem value="Africa">Africa</MenuItem>
    <MenuItem value="Americas">Americas</MenuItem>
    <MenuItem value="Asia">Asia</MenuItem>
    <MenuItem value="Europe">Europe</MenuItem>
    <MenuItem value="Oceania">Oceania</MenuItem>
  </Select>
    </FormControl>
  <FormControl variant='outlined' sx={{minWidth:120}}>
  <InputLabel>Sort Order</InputLabel>
  <Select
  lable='Sort Order'
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    
  >
    <MenuItem value="asc">Alphabetical</MenuItem>
    <MenuItem value="desc">Reverse Alphabetical</MenuItem>
  </Select>
</FormControl>
</Box>    {sortedCountries.map(country => (
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