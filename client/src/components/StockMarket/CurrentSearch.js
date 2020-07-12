import React from 'react';

const CurrentSearch = (props) => {
    const handleWatchClick = () => {
        console.log('hello world');
    }
    
    return (
        <div className="card gradient text-white">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-0 pb-0">{props.currentSearch.symbol}</h5>
                    <p className="small p-0 m-0">{props.currentSearch.name}</p>
                </div>
                {/* <div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => {handleWatchClick()}}><i className="fas fa-plus-circle pr-2" ></i>Watch</button>
                </div> */}
            </div>
            <div className="card-body">
                <h5 className="mb-0 pb-0">${props.currentSearch.currentPrice}</h5>
                <p className="small pt-0 mt-0">Updated At: {props.currentSearch.lastUpdate}</p>
                <button className="btn btn-raised btn-white" ><ion-icon name="refresh-outline"></ion-icon><span className="ml-2">Refresh</span></button>
                
            </div>
        </div>
    );
};

export default CurrentSearch;


