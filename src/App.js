import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import CoinList from './Components/CoinList';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function App() {
  const [currency, setCurrency] = useState('INR');
  const [itemPerPage, setItemPerPage] = useState('20');
  const [page, setPage] = useState('1');
  const [orderBy, setOrderBy] = useState('market_cap_desc');
  const [coinList, setCoinList] = useState([]);
  const [searchParam,setSearchParam] = useState('');


  const fetchData = async () => {
    const requestUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${itemPerPage}&page=${page}&sparkline=false`;
    const responseBody = await fetch(requestUrl);
    const response = await responseBody.json();
    setCoinList(response);
  }

  useEffect(
    () => {
      fetchData();
    }, []
  )
  useEffect(
    () => {
      //perform search
    }, [searchParam]
  )
  const handleChange = (e) =>
  {
    setSearchParam(e.target.value);
  }




  return (
    <div className="App">

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <img src="logo.svg" className="logoImg"/>__Crypto Tracker____
            </Typography>
            <Search onChange={handleChange}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search???"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <div className='coinWrapper'>
        <CoinList coinList={coinList} />
      </div>
    </div>
  );
}

export default App;
