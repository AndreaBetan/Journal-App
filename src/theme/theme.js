import { createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#f3e5f5',
    },
    secondary: {
      main: '#E0C2FF',
    },
    error: {
      main: '#a905b6',
    },
  },
});

export default theme;