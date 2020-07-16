import React, {useEffect, useState} from 'react';
import {useStoreContext} from '../utils/GlobalState';
import {Redirect, useHistory} from 'react-router-dom';
import API from '../utils/API';
import {
  LOGIN,
  GET_TRANSACTIONS,
  UPDATE_SUMS,
  GET_GOALS,
} from '../utils/actions';
import GoalsForm from '../components/goals/GoalsForm';
import {Doughnut, Bar} from 'react-chartjs-2';
import HomeButton from '../components/HomeButton';

const Goals = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStoreContext();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  /**
   * api call to the back end to get all financial data
   */
  function getTransactions() {
    API.getTransactions(state.user)
        .then((res) => {
          dispatch({
            type: GET_TRANSACTIONS,
            userFinancials: res.data[0].userFinancials,
          });
        })
        .catch((err) => console.log(err));
  }

  /**
   * api call to get all of the user goals
   */
  function getGoals() {
    API.getAllGoals(state.user)
        .then((res) => {
          dispatch({
            type: GET_GOALS,
            userGoals: res.data[0].userGoals,
          });
        });
  }

  /**
   * function used to calc sums for display in the tiles
   */
  function calculateSums() {
    const categoriesArr = ['income',
      'barsRestaurant',
      'travel',
      'groceries',
      'utilities',
      'mortgageRent'];
    const transactionsArr = state.userFinancials;
    const newSumObject = {
      income: 0,
      groceries: 0,
      mortgageRent: 0,
      utilities: 0,
      barsRestaurant: 0,
      travel: 0,
    };

    categoriesArr.forEach((category) => {
      const filteredTransactions = transactionsArr.filter((transaction) => {
        return transaction.category === category;
      });
      let sum = 0;
      filteredTransactions.forEach((item) => {
        sum += parseInt(item.amount);
      });
      newSumObject[category] = sum;
    });
    dispatch({
      type: UPDATE_SUMS,
      sumTransactions: newSumObject,
    });
  }

  const dataArr = [
    state.sumTransactions.barsRestaurant,
    state.sumTransactions.travel,
    state.sumTransactions.groceries,
    state.sumTransactions.utilities,
    state.sumTransactions.mortgageRent,
  ];

  let sumExpenditures = 0;
  dataArr.forEach((item) => {
    sumExpenditures+= item;
  });

  const data = {
    labels: ['Bars/Restaurants',
      'Travel',
      'Groceries',
      'Utilities',
      'Mortgage/Rent'],
    datasets: [
      {
        label: 'Budget',
        data: dataArr,
        fill: true,
        backgroundColor: [
          'rgba(50, 166, 104, .8)',
          'rgba(9, 118, 60, .8)',
          'rgba(50, 115, 149, .8)',
          'rgba(235, 160, 71, .8)',
          'rgba(235, 108, 71, .8)',
        ],
      },
    ],
  };

  const dataArrTwo = [
    -sumExpenditures, state.sumTransactions.income,
  ];

  const dataTwo = {
    labels: ['Expenditures', 'Income'],
    datasets: [
      {
        label: 'Budget',
        data: dataArrTwo,
        fill: true,
        backgroundColor: [
          'rgba(255, 0, 0, .8)',
          'rgba(50, 166, 104, .8)',
        ],
      },
    ],
  };

  useEffect(() => {
    getTransactions();
    getGoals();
    if (state.userFinancials.length > 0) {
      calculateSums();
    }
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
                      <div className="row">
                        <div className='col-md-6'>
                          <Doughnut data={data} />
                        </div>
                        <div className='col-md-6'>
                          <Bar data={dataTwo} />
                        </div>
                      </div>
                      <GoalsForm />
                    </div> :
                    <Redirect to="/login" />
              }
            </div>
      }
    </div>
  );
};

export default Goals;
