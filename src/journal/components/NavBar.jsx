import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

// drawerWidth es el tamano del menu lateral
export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout())    
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                // En pantallas sm se hara el calcualo que sea igual al 100% del ancho menos el ancho del draerWhith
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                // Solo en pantallas ml el ancho sera igual al drawerWidth
                ml: { sm: `${drawerWidth}px` }
                
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                    <IconButton color='error' onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>

        </AppBar>
    )
}