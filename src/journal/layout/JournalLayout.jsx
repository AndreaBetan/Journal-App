import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { NavBar, SideBar } from '../components';


// Menu lateral con su tamaño
const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}  className='animate__animated animate__fadeIn animate__faster'>

       <NavBar drawerWidth={ drawerWidth}/>

       <SideBar drawerWidth={ drawerWidth}/>

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
          {/* Toolbar: otorga el espacio para que el contenido de JournalPage quede bajo el Navbar */}
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}