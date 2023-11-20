import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from "@mui/material"


export const NothingSelectedView = () => {
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
        //   Calc ejecuta una operacion matematica, en este caso le resta 110 px a vh
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main'}}
    >
        <Grid item xs={ 12 }>
            <StarOutline sx={{fontSize: 100, color: 'error'}}/>
        </Grid>

        <Grid item xs={ 12 }>
           <Typography color='error' variant="h5"> Selecciona o crea una entrada</Typography>
        </Grid>
    </Grid>
  )
}
