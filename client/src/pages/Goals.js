import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect, useHistory } from 'react-router-dom';
import API from '../utils/API';
import { LOGIN, GET_TRANSACTIONS, UPDATE_SUMS } from '../utils/actions';
import GoalsForm from '../components/goals/GoalsForm';
import { Doughnut } from "react-chartjs-2";
import HomeButton from '../components/HomeButton';

const Goals = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useStoreContext();
    let history = useHistory();

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

    function calculateSums() {
        const categoriesArr = ['income', 'barsRestaurant', 'travel', 'groceries', 'utilities', 'mortgageRent'];
        const transactionsArr = state.userFinancials;
        let newSumObject =  {
          income: 0,
          groceries: 0,
          mortgageRent: 0,
          utilities: 0,
          barsRestaurant: 0,
          travel: 0,
        }
  
        categoriesArr.forEach((category) => {
            const filteredTransactions = transactionsArr.filter((transaction) => {
                return transaction.category === category;
            });
            let sum = 0;
            filteredTransactions.forEach((item) => {
                sum += parseInt(item.amount);
            });
            newSumObject[category] = sum;
        })
        dispatch({
            type: UPDATE_SUMS,
            sumTransactions: newSumObject,
        })
    }

    const dataArr = [
        state.sumTransactions.barsRestaurant,
        state.sumTransactions.travel,
        state.sumTransactions.groceries, 
        state.sumTransactions.utilities,
        state.sumTransactions.mortgageRent
    ]

    const data = {
        labels: ["Bars/Restaurants", "Travel", "Groceries", "Utilities", "Mortgage/Rent"],
        datasets: [
          {
            label: "Budget",
            data: dataArr,
            fill: true,
            backgroundColor: [
                "rgba(50, 166, 104, .8)",
                "rgba(9, 118, 60, .8)",
                "rgba(50, 115, 149, .8)",
                "rgba(235, 160, 71, .8)",
                "rgba(235, 108, 71, .8)",
            ],
          },
        ]
      };

    useEffect(() => {
        getTransactions();
        if (state.userFinancials.length > 0) {
          calculateSums();
        }
        if (state.user) {
            setLoading(false);
        } else {
            API.get_credentials().then(res => {
                dispatch({
                    type: LOGIN,
                    userID: res.data
                });
                console.log(`User ID: ${res.data}`);
            }).catch(err => {
                console.log(err);
            }).finally(_ => {
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
                            <div className='col-md-8 offset-md-2'>
                                <Doughnut data={data} />
                            </div>
                        </div>
                        <GoalsForm />
                    </div>  : 
                    <Redirect to="/login" />
                }
            </div>
            }
        </div>
    );
};

export default Goals;