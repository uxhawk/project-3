import React, { createContext, useReducer, useContext } from "react";
import { NEW_USER, LOGOUT, LOGIN } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case NEW_USER:
      return {
        ...state,
        user: action.userID
      };
    case LOGOUT:
      return {
        ...state,
        user: action.user,
        userFinancials: action.userFinancials,
      };
    case LOGIN:
      return {
        ...state,
        user: action.userID,
        userFinancials: action.userFinancials,
      }
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
        currentPrice: 10,
        lastUpdate: new Date(Date.now()).toLocaleString(),
      },
      {
        name: 'Dow Jones',
        symbol: 'DJI',
        currentPrice: 20,
        lastUpdate: new Date(Date.now()).toLocaleString(),
      },
      {
        name: 'Nasdaq',
        symbol: 'IXIC',
        currentPrice: 30,
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
