import Header from '../components/Header'
import { useState, useEffect,useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {motion} from 'framer-motion'
import InfoDisplay from '../components/InfoDisplay'
import Typography from '@mui/material/Typography'
import {Box, Container, Grid} from '@mui/material'
import {Card, CardMedia, CardContent} from '@mui/material'




const FlagPage = () => {

const [flag, setFlag] = useState(null)
const {countryCode} = useParams()
const [countryName, setCountryName] = useState('')
const [countryInfo, setCountryInfo] = useState([])
const [countries, setCountries] = useState([])


    const handleFetch = useCallback(async () => {
    
    try{
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)

        const data = res.data[0]
        const infoArray = [data.capital, data.population,data.continents, Object.values(data.languages).join(', ')]

        setCountries(res.data)
        setFlag(data.flags.png)
        setCountryInfo( [...infoArray])
        setCountryName(data.name.common)
    }catch(err){
        console.error(err)
    }
    },[])

    useEffect(() => {
        handleFetch()
    },[])
   
    const addCommas = (number) => {
        if(!number){
            return null
        }
        const string = number.toString()
        const arr = string.split('')
        const arrWithCommas = []
        let j = 1
        for(let i = arr.length - 1; i>=0;i--){
            if(i === 0){
                arrWithCommas.push(arr[i])
            } else if(j == 3){
                arrWithCommas.push(',' + arr[i])
                j = 1
            } else{
                arrWithCommas.push(arr[i])
                j++
            }
        }
        return arrWithCommas.reverse().join('')
    }
        return (
            <>
            <Header  />
            <Grid contianer spacing={1.5}>
                <Grid item sx={{display:'flex',justifyContent:'center'}}>
                    <Typography
                        variant='h2' component='h2'
                        sx={{textAlign:'center', color:'primary.main',
                        mb:3}}>
                        {countryName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Card
                    sx={{
                        maxWidth:600,
                        mx:'auto',
                        boxShadow:3,
                        borderRadius:2,
                        overflow: 'hidden'
                    }}>
                        <motion.div 
                        key={flag}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        transition={{duration:1}}
                        >
                            <CardMedia
                            component='img'
                            src={flag}
                            alt='Flag'
                            
                            />
                        </motion.div>
                    </Card>
                </Grid>
                <Grid
                container
                direction='column'
                alignItems='center'>
                    <InfoDisplay
                    capital={countryInfo[0]} 
                    population={addCommas(countryInfo[1])}
                    continent={countryInfo[2]}
                    languages={countryInfo[3]}
                    name={countryName} 
                    showName={false}
                    />
               </Grid>
            </Grid>
            </>
        )

  
}

export default FlagPage