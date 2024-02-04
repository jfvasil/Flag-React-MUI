import {Grid, CircularProgress,Box} from '@mui/material'
import MediaCard from '../components/MediaCard'
import Header from '../components/Header'
import axios from 'axios'
import { useState,useCallback,useEffect } from 'react'
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
        <Box sx={{ display: 'flex', flexDirection:'column', 
        justifyContent:'center', alignItems:'center', 
        width:'full', height:'full'}}>
        <CircularProgress />
      </Box>
    ) : (
    <Grid container 
    spacing={2} sx={{padding: 2}}>
<Box sx={{ my: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
  <select
    value={filterContinent}
    onChange={(e) => setFilterContinent(e.target.value)}
    aria-label="Filter by Continent"
  >
    <option value="">All Continents</option>
    <option value="Africa">Africa</option>
    <option value="Americas">Americas</option>
    <option value="Asia">Asia</option>
    <option value="Europe">Europe</option>
    <option value="Oceania">Oceania</option>
  </select>

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    aria-label="Sort Order"
  >
    <option value="asc">Alphabetical</option>
    <option value="desc">Reverse Alphabetical</option>
  </select>
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