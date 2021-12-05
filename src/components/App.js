import React from "react";
import "./App.css";
import Table1 from './entities/Table1';
import Covid19 from "./components/Covid19";


function App() {
  const url1 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/archived_data/archived_daily_case_updates/01-21-2020_2200.csv";
  return (
    <div className='App'>
      <h1>Covid Dashboard</h1>
      <Covid19 />
      <Table1 url1={url1}/>
    </div>
  );
}

export default App;
