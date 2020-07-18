/* eslint-disable react/prop-types */
import React from 'react';

const CurrentSearch = (props) => {
  return (
    <div className="card gradient text-white">
      <div className="card-header d-flex
      justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 pb-0">{props.currentSearch.symbol}</h5>
          <p className="small p-0 m-0">{props.currentSearch.name}</p>
        </div>
      </div>
      <div className="card-body">
        <h5 className="mb-0 pb-0">${props.currentSearch.currentPrice}</h5>
        <p className="small pt-0 mt-0">
          Updated At: {props.currentSearch.lastUpdate}</p>
        <button className="btn btn-raised btn-white" >
          <ion-icon name="refresh-outline"></ion-icon>
          <span className="ml-2">Refresh</span></button>
      </div>
    </div>
  );
};

export default CurrentSearch;
