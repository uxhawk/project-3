/* eslint-disable react/prop-types */
import React from 'react';
/**
 * Function to create a LONG data list for autocomplete
 * @param {props} props is the object returned from finnhub
 * @return {component} for visual display
 */
function DataList(props) {
  return (
    <datalist id="availableStocks">
      {
        props.symbols.map((item, index) => {
          return <option key={index}
            value={`${item.description} - ${item.symbol}`}
            data-symbol={item.symbol}/>;
        })
      }
    </datalist>
  );
}

export default DataList;
