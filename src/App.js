import React, {useState} from "react";
import "./App.css";
import Covid19 from "./components/Covid19";
import Header from "./components/Header";
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControlLabel } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Table1 from './entities/Table1';
import Table2 from './entities/Table2';
import Chart1 from './entities/Chart1';
import Chart2 from "./entities/Chart2";
import Chart3 from "./entities/Chart3";

function App() {
  const [light, setLight] = useState(true)

  const theme = createTheme({
      palette: {
          mode: light ? 'light' : 'dark',
      },
  })

  
  return (
    <ThemeProvider theme={theme}>
    <div className='App'>
      <CssBaseline />
        <Header />
      <div className='but'>
      <FormControlLabel control={<Switch checked={!light} onChange={() => setLight(!light)} />} label={light ?"Light mode" : "Dark mode"}/>
      <IconButton sx={{ ml: 1 }} onClick={() => setLight(!light)} color="inherit">
        {light ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </div>
      <div className='tables'>
      <Table1 />
      <Table2 />
      </div>
      <Covid19 />
      <div className='charts'>
        <Chart1 mode={light} />
        <Chart2 mode={light} />
        <Chart3 mode={light} />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
