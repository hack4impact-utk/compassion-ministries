import { green } from '@mui/material/colors';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: 'white', // Set text color to white for contained buttons
        },
      },
    },
  },
});

export default theme;
