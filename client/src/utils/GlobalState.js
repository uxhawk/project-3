import React, { createContext, useReducer, useContext } from "react";
import update from 'react-addons-update';
import { NEW_USER, LOGOUT, LOGIN, ADD_SYMBOLS, UPDATE_PRICE, GET_STOCK_PRICE } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case NEW_USER:
      return {
        ...state,
        user: action.userID,
      };
    case LOGOUT:
      return {
        ...state,
        user: action.userID,
        userFinancials: action.userFinancials,
      };
    case LOGIN:
      return {
        ...state,
        user: action.userID,
        userFinancials: action.userFinancials,
      }
    case ADD_SYMBOLS:
      return {
        ...state,
        autoFillSymbols: [...action.symbols, ...state.autoFillSymbols]
      };
    // this really should be update index price
    case UPDATE_PRICE:
      return update(state, {
        stockMarketIndicies: {
          [action.index]: {
            lastUpdate: {
              $set: new Date(Date.now()).toLocaleString(),
            },
            currentPrice: {
              $set: action.currentPrice,
            }
          }
        }
      }); 
    case GET_STOCK_PRICE: 
      return update(state, {
        currentSearch: {
          name: {
            $set: action.company,
          },
          currentPrice: {
            $set: action.price,
          },
          symbol: {
            $set: action.symbol
          },
          lastUpdate: {
            $set: action.lastUpdate,
          },
        }
      })
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    stockMarketIndicies: [
      {
        name: 'S&P 500',
        symbol: 'GSPC',
        currentPrice: 0,
        lastUpdate: new Date(Date.now()).toLocaleString(),
      },
      {
        name: 'Dow Jones',
        symbol: 'DJI',
        currentPrice: 0,
        lastUpdate: new Date(Date.now()).toLocaleString(),
      },
      {
        name: 'Nasdaq',
        symbol: 'IXIC',
        currentPrice: 0,
        lastUpdate: new Date(Date.now()).toLocaleString(),
      },

    ],
    autoFillSymbols: [],
    user: '',
    userFinancials: [],
    currentStockSearch: {
      name: '',
      currentPrice: 0,
      symbol: '',
      lastUpdate: '',
    },
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
