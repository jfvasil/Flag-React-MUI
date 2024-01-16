import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Layout from './components/Layout'

function App() {
  

  return (
  <Routes>

    <Route path='/' element={<Layout />}>

    <Route path='/' element={<Landing />}></Route>




    </Route>
</Routes>

)
}

export default App
