import React from 'react';
import Card from '../StockMarket/Card';
// import Search from './Search';
import {useStoreContext} from '../../utils/GlobalState';


const MarketOverview = () => {
  const [state] = useStoreContext();

  return (
    <div className="row container-fluid m-0 pb-4">
      <div className="col-md-10 offset-md-1 mt-4">
        <div className="row">
          {
            state.stockMarketIndicies.map((item, index) => {
              return (
                <div className="col-sm-4" key={index}>
                  <Card state={state.stockMarketIndicies[index]} id={index}/>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
