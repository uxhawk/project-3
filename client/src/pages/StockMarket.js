import React, { useEffect } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect, useHistory } from 'react-router-dom';

const StockMarket = () => {
    const [state]= useStoreContext();
    let history = useHistory();

    useEffect(() => {
        console.log(state.user);
    })

    function handleNavClick(event) {
        const destination = event.target.getAttribute('nav-value');
        console.log(destination);
        history.push(`/${destination}`);
      }

    if (state.user === '') {
        return <Redirect to="/login" />; 
    }

    return (
        <div>
            Stock market
            <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</button>
            <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals</button>
            <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Add Transactions</button>
        </div>
    );
};

export default StockMarket;