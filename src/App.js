import React, {useState} from "react";
import "./App.css";
import Covid19 from "./components/Covid19";
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControlLabel } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [dark, setDark] = useState(false)

  const theme = createTheme({
      palette: {
          mode: dark ? 'dark' : 'light',
      },
  })

  return (
    <ThemeProvider theme={theme}>
    <div className='App'>
      <CssBaseline />
      <h1>Covid Dashboard</h1>

      <FormControlLabel control={<Switch checked={!dark} onChange={() => setDark(!dark)} />} label={dark ? "Dark mode" : "Light mode"}/>
      <IconButton sx={{ ml: 1 }} onClick={() => setDark(!dark)} color="inherit">
        {dark ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
      
      <Covid19 />
    </div>
    </ThemeProvider>
  );
}

export default App;
