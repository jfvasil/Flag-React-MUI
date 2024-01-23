import {motion} from 'framer-motion'
import Header from '../components/Header'
import  Rating  from '../components/Rating'
import InfoDisplay from '../components/InfoDisplay'
import Typography from '@mui/material/Typography'
import {Box, Container, Grid} from '@mui/material'
import {Card, CardMedia, CardContent} from '@mui/material'
import axios from 'axios'
import { useEffect,useState, useCallback } from 'react'
// import {styled} from 




const Landing = () => {

    const wikiURL = 'https://en.wikipedia.org/wiki/'

    const [flag, setFlag] = useState(null)
    const [countryName, setCountryName] = useState('')
    const [countryInfo, setCountryInfo] = useState([])
   
    const [counter, setCounter] = useState(0)




    useEffect(() => {
        
        const countingDown = () => {                 
        if(counter <= 0){
            setCounter(10)
        }
        setTimeout(() => setCounter(counter - 1), 1000 )
        }
        countingDown()
    })

   
   
    const handleFetch = useCallback(async () => {


        if(counter == 0){

        try{
        const res = await axios.get('https://restcountries.com/v3.1/all')

        const randomCountry = res.data[Math.floor(Math.random() * res.data.length)]

         console.log(res.data)

        const data = randomCountry
        const infoArray = [data.capital, data.population,data.continents, Object.values(data.languages).join(', ')]

        setFlag(data.flags.png)
        setCountryInfo( [...infoArray])
        setCountryName(data.name.common)
    }catch(err){
        console.error(err)
    }
}
    
    },[counter])

    useEffect(() => {
        handleFetch()
    },[counter])




        return (
            <>
                <Header />
            <Grid contianer spacing={1.5}>
                <Grid item sx={{display:'flex',justifyContent:'center'}}>
                    <Typography
                        variant='h2' component='h2'>
                        Flag of the Moment
                    </Typography>
                </Grid>
                <Grid item>
                    <Card
                    sx={{
                        maxWidth:600,
                        mx:'auto',
                        boxShadow:3,
                        borderRadius:2
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
                            sx={{}}
                            />
                        </motion.div>
                    </Card>
                </Grid>
                <Grid container 
                direction='column'
                alignItems='center'>
                    <InfoDisplay
                    capital={countryInfo[0]} 
                    population={countryInfo[1]}
                    continent={countryInfo[2]}
                    languages={countryInfo[3]} 
                    name={countryName}/>
                    <Grid item sx={{paddingY:4}}>
                    <Typography variant='h2' component='h3'>
                    New Flag in:
                    <motion.div 
                    initial={{opacity: 0, scale:0.8}}
                    animate={{opacity:1, scale:1}}
                    transition={{duration:1}}
                    >
                    {counter}
                    </motion.div>
                    </Typography>
                </Grid>
                {/* <Rating /> */}
                </Grid>
            </Grid>
            </>
        )
    }

export default Landing