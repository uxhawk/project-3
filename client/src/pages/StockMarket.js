import React from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';

const StockMarket = () => {
    const [state]= useStoreContext();

    if (state.user.length === 0) {
        return <Redirect to="/login" />; 
    }

    return (
        <div>
            stock market
        </div>
    );
};

export default StockMarket;