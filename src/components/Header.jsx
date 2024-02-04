import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import{Autocomplete,TextField} from '@mui/material'
import FadeMenu from './FadeMenu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));








export default function SearchAppBar() {

    const navigate = useNavigate()
    const theme = useTheme()
    const [countries,setCountries] = useState([])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }
    


    const handleFetch =  async () => {
  
      try{
          const res = await axios.get('https://restcountries.com/v3.1/all')
          
          
          setCountries(res.data)
          console.log(countries)
      }catch(err){
          console.error(err)
      }
    }
    
    
  useEffect(() => {
    handleFetch()
  },[])
      
   




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            id = 'fade-button'
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <FadeMenu 
          handleClose={handleClose}
          anchorEl={anchorEl}
          open={open} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },color:theme.palette.text.secondary }}
          >
            Flags and Countries
          </Typography>
          
          <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries || []}
      autoHighlight
      getOptionLabel={(option) => option.name.common}
      onChange={(event, value) => value && navigate(`/flag/${value.cca2}`)}
      renderOption={(props, option) => (
         <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.cca2.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.cca2.toLowerCase()}.png`}
            alt="flag"
          />
          {option.name.common} {option.cca2}
        </Box>
        
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    /> 
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a country..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
