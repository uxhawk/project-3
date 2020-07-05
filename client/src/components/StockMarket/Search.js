import React, { useEffect } from 'react';
import DataList from './DataList';
import API from '../../utils/API';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_SYMBOLS, GET_STOCK_PRICE } from '../../utils/actions';
import CurrentSearch from '../../components/StockMarket/CurrentSearch';

const Search = () => {
    const [state, dispatch] = useStoreContext();
    
    const getSymbols = () => {
        // get all symbols for stocks
        API.getSymbols()
            .then(results => {
            dispatch({
                type: ADD_SYMBOLS,
                symbols: results.data,
            });
            })
            .catch(err => console.log(err));

        API.getMutualFundSymbols()
            .then(results => {
            dispatch({
                type: ADD_SYMBOLS,
                symbols: results.data,
            });
            })
            .catch(err => console.log(err));
    }

    const clearStockSearch = () => {
        document.getElementById('stockSearch').value = '';
    }

    const getPrice = () => {
        const searchInputValue = document.getElementById('stockSearch').value;
        
        if(!searchInputValue) {
            return;
        }

        let inputValueSplit = searchInputValue.split(" ");
        const inputSymbol = inputValueSplit[inputValueSplit.length -1];

        inputValueSplit.splice(inputValueSplit.length - 2, 2);
        const company = inputValueSplit.join(' ');        

        API.getCurrentStockPrice(inputSymbol)
            .then((res) => {
                const mostRecentUpdateTime = res.data["Meta Data"]["3. Last Refreshed"];
                const mostRecentPrice = res.data["Time Series (5min)"][mostRecentUpdateTime]["1. open"];
                dispatch({
                    type: GET_STOCK_PRICE,
                    price: mostRecentPrice,
                    lastUpdate: mostRecentUpdateTime,
                    symbol: inputSymbol,
                    company: company,
                });
            })  
            .catch((err) => console.log(err));
            document.getElementById('stockSearch').value = '';
    }
      
    useEffect(() => {
        getSymbols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div>
           <div className="row pb-4">
                <div className="col-lg-8 col-md-10 offset-lg-2 offset-md-1">
                    <div className="input-group mb-3">
                        <input list="availableStocks" type="text" className="form-control" id="stockSearch" placeholder="Search for stock prices" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {clearStockSearch()}}>Clear</button>
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {getPrice()}}>Search Stocks</button>
                        </div>
                    </div>
                    <DataList symbols={state.autoFillSymbols}/>
                </div>
            </div>
        <div className="row">
            <div className="col-md-4 offset-md-4">
            {
                state.currentSearch.name === '' ? "" : <CurrentSearch currentSearch={state.currentSearch}/>
            }
            </div>
        </div>
        </div>
    );
};

export default Search;