import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';


export const AppTheme = ({children}) => {
    //Al enviar el children, este componenete se convierte en un HOC. El children es la App
  return (

    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
    
  )
}


