import React, {createContext, useReducer, useContext} from 'react';
import update from 'react-addons-update';
import {NEW_USER, LOGOUT, LOGIN, ADD_SYMBOLS,
  UPDATE_PRICE, GET_STOCK_PRICE, GET_TRANSACTIONS,
  UPDATE_SUMS, GET_GOALS} from './actions';

const StoreContext = createContext();
const {Provider} = StoreContext;

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
        userFinancials: action.userFinancials,
      };
    case LOGIN:
      return {
        ...state,
        user: action.userID,
        userFinancials: action.userFinancials,
      };
    case ADD_SYMBOLS:
      return {
        ...state,
        autoFillSymbols: [...action.symbols, ...state.autoFillSymbols],
      };
    case UPDATE_PRICE:
      return update(state, {
        stockMarketIndicies: {
          [action.index]: {
            lastUpdate: {
              $set: new Date(Date.now()).toLocaleString(),
            },
            currentPrice: {
              $set: action.currentPrice,
            },
          },
        },
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
            $set: action.symbol,
          },
          lastUpdate: {
            $set: action.lastUpdate,
          },
        },
      });
    case GET_TRANSACTIONS:
      return {
        ...state,
        userFinancials: [...action.userFinancials],
      };
    case UPDATE_SUMS:
      return {
        ...state,
        sumTransactions: action.sumTransactions,
      };
    // case ADD_GOALS:
    //   return {
    //     ...state,
    //     userGoals: action.goal
    //   }
    case GET_GOALS:
      return {
        ...state,
        userGoals: [...action.userGoals],
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const StoreProvider = ({value = [], ...props}) => {
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
    currentSearch: {
      name: '',
      currentPrice: 0,
      symbol: '',
      lastUpdate: new Date(Date.now()).toLocaleString(),
    },
    autoFillSymbols: [],
    user: '',
    userFinancials: [],
    userGoals: [],
    sumTransactions: {
      income: 0,
      groceries: 0,
      mortgageRent: 0,
      utilities: 0,
      barsRestaurant: 0,
      travel: 0,
    },
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export {StoreProvider, useStoreContext};
