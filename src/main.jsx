import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { ThemeProvider,createTheme, responsiveFontSizes } from '@mui/material/styles'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D1C1D7',
      light: '#D1C1D7',
      dark: '#38bdf8',
    },
    secondary: {
      main: '#f6cbd1',
      light: '#f6cbd1',
      dark: '#818CF8',
    },
    info: {
      main: '#F471B5',
      light: '#b4e9d6',
    },
    success: {
      main: '#70acc7',
      light: '#70acc7',
      dark: '#1E293B',
    },
    background: {
      default: '#0F172A',
      paper: '#70acc7',
    },
    text: {
      primary: '#C8CBD0',
      secondary: '#383E4F',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  props: {
    MuiAppBar: {
      color: 'secondary',
    },
  }
})

theme = responsiveFontSizes(theme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
    <Route path='/*' element={<App />} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
