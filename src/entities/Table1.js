import * as React from 'react';
import papa from "papaparse";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { letterSpacing } from '@mui/system';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
function createData(city, country, cases, suspected, k) {
  return { city, country, cases, suspected, k};
}

 function processCovidData(res){
    
    var newRows = [].sort((a, b) => (a.cases < b.cases ? -1 : 1));
    for(let i = 0; i < res.length; i++){
        newRows.push(createData(res[i]['Province/State'],res[i]['Country/Region'], res[i]['Confirmed'], res[i]['Suspected'], i));
    }
    return newRows;
  }

export default function CustomPaginationActionsTable() {
  const [rowss, setRows] = React.useState([]);
  let rows = []
  const covidUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/archived_data/archived_daily_case_updates/01-21-2020_2200.csv";
  React.useEffect(() => {
    async function getData() {
      const response = await fetch(covidUrl)
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rowss = results.data // array of objects
      setRows(rowss)
    }
    getData()
  }, [])
  rows = processCovidData(rowss)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <TableContainer component={Paper} sx={{border: "10px solid rgba(255,255,255,.5)"}}>
      <Table sx={{border: "3px solid rgb(0, 0, 0)"}} aria-label="custom pagination table">
      <TableHead sx={{border: "3px solid rgb(0, 0, 0)"}}>
          <TableRow>
            <TableCell sx= {{fontSize:'12px'}}>Province/State</TableCell>
            <TableCell sx= {{fontSize:'12px'}}>Country/Region</TableCell>
            <TableCell sx= {{fontSize:'12px'}}>Confimed Cases</TableCell>
            <TableCell sx= {{fontSize:'12px'}}>Suspected Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.k}>
              <TableCell component="th" scope="row" sx= {{fontSize:'12px'}}>
                {row.city}
              </TableCell>
              <TableCell component="th" scope="row" sx= {{fontSize:'12px'}}>
                {row.country}
              </TableCell>
              <TableCell style={{ width: 80 }} sx= {{fontSize:'12px'}}>
                {row.cases}
              </TableCell>
              <TableCell style={{ width: 80 }} sx= {{fontSize:'12px'}}>
                {row.suspected}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} sx= {{fontSize:'12px'}}/>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx= {{fontSize:'12px'}}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
                
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}