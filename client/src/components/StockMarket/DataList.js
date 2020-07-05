import React from 'react';

function DataList(props) {
        return (
            <datalist id="availableStocks">
            {
                props.symbols.map((item, index) =>  {
                return <option key={index} value={`${item.description} - ${item.symbol}`} data-symbol={item.symbol}/>
            })
            }
            </datalist>
        )
}

export default DataList;