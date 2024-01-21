import Header from '../components/Header'
import  Rating  from '../components/Rating'
import Typography from '@mui/material/Typography'
import {Box, Container} from '@mui/material'
import {Card, CardMedia, CardContent} from '@mui/material'
import axios from 'axios'
import { useEffect,useState, useCallback } from 'react'
// import {styled} from 




const Landing = () => {

    const wikiURL = 'https://en.wikipedia.org/wiki/'

    const [flag, setFlag] = useState(null)
    const [countryName, setCountryName] = useState('')
    const [countryInfo, setCountryInfo] = useState([])
    const [timer,setTimer] = useState(0)
    const [counter, setCounter] = useState(10)

    const getTodaysDate = () => {
        const today = new Date()
        return `${today.getFullYear()} - ${today.getMonth() + 1} - ${today.getDay()}`
    }



    useEffect(() => {
        setTimeout(() =>  setTimer(timer + 1), 10000)
        const countingDown = () => {
        if(counter == 0){
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

        // console.log(res.data)

        const data = randomCountry
        const infoArray = [data.capital, data.population,data.continents, data.languages.deu]

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
            <Container sx={{minHeight: '100vh'}}>
                <Box 
                sx={{display:'flex', justifyContent:'center', flexGrow:1}}>
                    <Typography
                        variant='h2' component='h2'>
                        Flag of the Day
                    </Typography>
                </Box>
                <Container>
                    <Card
                    sx={{width:'full', height:'full'}}>
                        <CardMedia
                        component='img'
                        src={flag}
                        alt='Flag'
                        sx={{}}
                        />
                    </Card>
                <Box>
                    <Typography
                    variant='h3' component='h3'>
                    {countryName}
                    </Typography>
                    <Typography>
                       Capital: {countryInfo[0]}, Population: {countryInfo[1]}, Continent: {countryInfo[2]}, 
                        Languages: {countryInfo[3]}. 
                          Find more info on: <a href={wikiURL + countryName} target='_blank'>Wikipedia</a>
                    </Typography>
                    <Typography>
                       New Flag in: {counter}
                    </Typography>
                </Box>
                <Rating />
                </Container>
            </Container>
            </>
        )
    }

export default Landing