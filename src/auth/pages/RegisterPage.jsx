import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassowrd } from '../../store/auth';



const formData = {
  email: '',
  password: '',
  displayName: ''
}

// Para determinar que el formulario es valido, todas las fx deben cumplirse
const formValidations = {
  // Arreglo de 2 valores: 1.Fx a evaluar y el 2. Mensaje si no se cumple la condicion
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // useSelector: permite seleccionar datos del estado global de Redux, en este caso (status, errorMessage).
  const { status, errorMessage } = useSelector( state => state.auth );
  //Memorizar el valor de isAuthenticating, que se calcula basándose en el estado status. Si status es 'checking', isAuthenticating será true; de lo contrario, será false.
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid, 
  } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();
    // Cuando se envia el formulario, formSubmitted pasa a true, de lo contrario esta en false y evita que se genere alerta de validacion antes de diligenciar los campos
    setFormSubmitted(true);

    if ( !isFormValid ) return;
    // se dispara el startCreatingUserWithEmailPassowrd y se envia el formState que es el que tiene toda la data
   dispatch(startCreatingUserWithEmailPassowrd(formState));
  }

  return (
    <AuthLayout title="Crear cuenta">

      <form onSubmit={ onSubmit }  className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                // Si el displayName no es Valido muestra un error y se realizo el envio del formulario muestra un error
                error={ !!displayNameValid && formSubmitted } //formSubmitted: evita que se genere el error antes de que se envie el formulario
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                // Si el email no es Valido y se realizo el envio del formulario muestra un error
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                // Si el password no es Valido muestra un error y se realizo el envio del formulario muestra un error
                error={ !!passwordValid && formSubmitted  }
                helperText={ passwordValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              
              <Grid 
                item 
                xs={ 12 }
                // Si errorMessage no está vacío (es decir, !!errorMessage es true), entonces display se establecerá como una cadena vacía (''), lo que indica que el elemento será visible en la página.
                display={ !!errorMessage ? '': 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid item xs={ 12 }>
                <Button 
                // Si esta autenticando el boton esta deshabilitado
                  disabled={ isCheckingAuthentication }
                  type="submit"
                  variant='contained' 
                  fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}