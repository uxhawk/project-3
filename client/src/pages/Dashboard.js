import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import API from '../utils/API';
import { LOGIN, LOGOUT, GET_TRANSACTIONS, UPDATE_SUMS } from '../utils/actions';
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
        console.log(state.userFinancials);
}
    
    useEffect(() => {
      const script = document.createElement("script");

      script.src = "./js/multiple.js";
      script.async = true;
  
      document.body.appendChild(script);
      
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
                      Dashboard
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</button>
                        <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals</button>
                        <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="transaction">Add Transactions</button>
                        <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="dashboard">Dashboard</button>
                      <div className="tiles">
                          <div class="item-income">{state.sumTransactions.income}</div>
                          <div class="item-travel">Travel</div>
                          <div class="item-bills">
                            <p class="pt-3">Bills</p>
                            <p>INCOME</p>
                          </div>
                          <div class="item-signout">
                              <div class="row">
                                  <div class="col-sm-12 text-danger">
                                      <img src="client\src\img\Sign-out-icon.png" style="margin:auto; width:221px;display:block" />
                                      <p>SIGN OUT</p>
                                  </div>
                              </div> 
                          </div>
                          <div class="item-addTransactions">Add Transaction</div>
                          <div class="item-groceries">{state.sumTransactions.groceries}</div>
                            {/* <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</button>
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals</button>
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="transaction">Add Transactions</button>
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="dashboard">Dashboard</button>
                      <button className="btn btn-info" onClick={() => {handleSignOut()}} nav-value="dashboard">Sign Out</button> */}
                          <div class="item-goals">GOALS</div>
                          <div class="item-barsAndRestaurants">Bars and Restaurants</div>
                          <div class="item-rent">Rent</div> 
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




