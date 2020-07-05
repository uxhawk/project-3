import React, { useEffect } from 'react';
import { UPDATE_PRICE } from '../../utils/actions';
import API from '../../utils/API';
import { useStoreContext } from '../../utils/GlobalState';

const Card = (props) => {
    const [state, dispatch] = useStoreContext();

    const handleRefreshClick = (event) => {
        // console.log(event.currentTarget.getAttribute('symbol'));
        getPrices(event.currentTarget.getAttribute('symbol'));
    }

    const getPrices = (symbol) => {
        API.getIndexPrices(symbol)
        .then((res) => {
            dispatch({
                type: UPDATE_PRICE,
                index: props.id,
                currentPrice: res.data.c
            });
        })
        .catch((err) => console.log(err));
    }
    useEffect(() => {
        getPrices(props.state.symbol);
    }, []);

    return (
    <div className="card" key={props.id}>
        <h5 className="card-header">{props.state.name}</h5>
        <div className="card-body">
            <h5 className="card-title mb-0">{props.state.currentPrice}</h5>
            <p className="small pt-0 mt-0" id={`${props.state.name}Time`}>{props.state.lastUpdate}</p>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <button id={props.id} className="btn btn-info" symbol={props.state.symbol} onClick={ (event) => {handleRefreshClick(event)} }><span className="fas fa-sync-alt pr-2" ></span>Refresh</button>
        </div>
    </div>
    );
};

export default Card;