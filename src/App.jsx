import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Layout from './components/Layout'
import FlagPage from './pages/FlagPage'

function App() {
  

  return (
  <Routes>

    <Route path='/' element={<Layout />}>

    <Route path='/' element={<Landing />}></Route>
    <Route path='/flag/:countryCode' Component={FlagPage}></Route>



    </Route>
</Routes>

)
}

export default App
