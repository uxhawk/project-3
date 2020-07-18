import React, {useEffect, useState} from 'react';
import {useStoreContext} from '../utils/GlobalState';
import {Redirect, useHistory} from 'react-router-dom';
import API from '../utils/API';
import {LOGIN} from '../utils/actions';
import MarketOverview from '../components/StockMarket/MarketOverview';
import Search from '../components/StockMarket/Search';
import HomeButton from '../components/HomeButton';

const StockMarket = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStoreContext();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  useEffect(() => {
    if (state.user) {
      setLoading(false);
    } else {
      API.get_credentials().then((res) => {
        dispatch({
          type: LOGIN,
          userID: res.data,
        });
        // console.log(`User ID: ${res.data}`);
      }).catch((err) => {
        console.log(err);
      }).finally((_) => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <div>
      {loading ? <div>Loading... Please wait.</div> :
            <div>
              {
                state.user ?
                    <div>
                      <HomeButton />
                      <MarketOverview />
                      <Search />
                    </div> :
                    <Redirect to="/login" />
              }
            </div>
      }
    </div>
  );
};

export default StockMarket;
