import { Outlet } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline'

const Layout = () => {
    return (
    
        <main className="App">
        <CssBaseline enableColorScheme>
            <Outlet />
        </CssBaseline>
        </main>
    )
}

export default Layout