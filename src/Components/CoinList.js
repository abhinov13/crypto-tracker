import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { sizing } from '@mui/system';

const CoinList = (props) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (<>
        {
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '80vh' }} onScroll={(e)=>{props.handleScroll(e)}}>
                <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Logo</StyledTableCell>
                            <StyledTableCell align="right">Symbol</StyledTableCell>
                            <StyledTableCell align="right">Price Change</StyledTableCell>
                            <StyledTableCell align="right">Volume</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.coinList.map((coin) => (
                            <>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">{coin.name}</StyledTableCell>
                                    <StyledTableCell align="right"><img src={coin.image} className="coinImg" /></StyledTableCell>
                                    <StyledTableCell align="right">{coin.symbol}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {
                                            coin.price_change_percentage_24h < 0 ? <div className="loss">{coin.price_change_percentage_24h} </div> :
                                                coin.price_change_percentage_24h > 0 ? <div className="profit"> +{coin.price_change_percentage_24h}</div> :
                                                    <>{coin.price_change_percentage_24h}</>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{coin.market_cap}</StyledTableCell>
                                    <StyledTableCell align="right">{coin.current_price}</StyledTableCell>
                                </StyledTableRow>

                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        }
    </>);
}

export default CoinList;