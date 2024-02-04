import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Layout from './components/Layout'
import FlagPage from './pages/FlagPage'
import AllFlags from './pages/AllFlags'

function App() {
  

  return (
  <Routes>

    <Route path='/' element={<Layout />}>

    <Route path='/' element={<Landing />}></Route>
    <Route path='/flag/:countryCode' element={<FlagPage />}></Route>
    <Route path='/flag/all-flags' element={<AllFlags />}></Route>


    </Route>
</Routes>

)
}

export default App
