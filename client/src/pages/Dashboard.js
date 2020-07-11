import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import API from '../utils/API';
import { LOGIN, LOGOUT, GET_TRANSACTIONS, UPDATE_SUMS, GET_GOALS } from '../utils/actions';
import '../App.css';


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStoreContext();
  let history = useHistory();

  function calculateSums() {
      const categoriesArr = ['income', 'barRestaurant', 'travel', 'groceries', 'utilities', 'mortgageRent'];
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
  const numGoals = state.userGoals.length;
  function getGoals() {
    API.getAllGoals(state.user)
        .then((res) => {
            dispatch({
                type: GET_GOALS,
                userGoals: res.data[0].userGoals,
            })
        })
    console.log(state.userGoals[0]);
}

  function handleNavClick(event) {
    const destination = event.target.getAttribute('nav-value');
    history.push(`/${destination}`);
  } 
  
  function handleSignOut() {
    API.logout()
      .then(async () => dispatch({
        type: LOGOUT,
        userID: '',
        userFinancials: [],
      }))
      .catch(err => console.log(err));
  }

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
    
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "./js/multiple.js";
      script.async = true;
      document.body.appendChild(script);
      
      getTransactions();
      getGoals();
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
                      Dashboard
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</button>
                        <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals</button>
                        <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="transaction">Add Transactions</button>
                        <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="dashboard">Dashboard</button>
                      <div className="tiles">
                          <div className="item">{state.sumTransactions.income}</div>
                          <div className="item">{state.sumTransactions.groceries}</div>
                            {/* {state.userGoals.length > 0 ? <div className="item">
                                {state.userGoals[state.userGoals.length -1].title}
                                Check the status of your {state.userGoals.length} goals
                                
                                </div> :
                            <div className="item">empty</div>
                            } */}
                        <div className="item">Check the status of your goals</div>
                          <div className="item">item 4</div>
                          <div className="item">item 5</div>
                          <div className="item">item 6</div>
                          <div className="item">item 7</div>
                          <div className="item">item 8</div>
                          <div className="item">item 9</div>
                          <div className="item-tall">item 10</div>
                          <div className="item">item 11</div>
                          <div className="item">item 12</div>  
                      </div>
                  </div>  : 
                  <Redirect to="/login" />
              }
          </div>
          }
      </div>
  );
};

export default Dashboard;




