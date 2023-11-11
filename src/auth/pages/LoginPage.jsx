import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth';


export const LoginPage = () => {

  // useSelector: permite seleccionar datos del estado global de Redux, en este caso (status, errorMessage).
  const { status, errorMessage } = useSelector(state => state.auth);

  // useDispatch proporciona acceso al despachador de acciones Redux.
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    'email': 'andre@gmail.com',
    'password': 123
  })

  //Memorizar el valor de isAuthenticating, que se calcula basándose en el estado status. Si status es 'checking', isAuthenticating será true; de lo contrario, será false.
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  //onSubmit se llama cuando se envía el formulario de inicio de sesión. Dispara la acción checkingAuthentication cuando se hace clic en el botón de inicio de sesión.
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  // onGoogleSingIn se llama cuando se hace clic en el botón de inicio de sesión de Google. Dispara la acción startGoogleSingIn.
  const onGoogleSingIn = () => {
    console.log('onGoogleSingIn');
    // pasa el status inicial de la app a checking
    dispatch(startGoogleSingIn())
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder='password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
            container
            // Si hay un mensaje de error, entonces display se establecerá como una cadena vacía '', lo que significa que el elemento será mostrado, de lo contrario el elemento no se mostrará 
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}>
            <Grid
              item
              xs={12}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                // Si esta autenticando el boton esta deshabilitado
                disabled={isAuthenticating}
                type='submit'
                variant='contained'
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                fullWidth
                onClick={onGoogleSingIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>


          <Grid container direction='row' justifyContent='end'>
            {/* El componente es el del Router que estoy usando */}
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Register
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}