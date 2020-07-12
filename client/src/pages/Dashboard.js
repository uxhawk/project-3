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

  const styles = {
    imgStyle: {
      margin: "auto",
      maxWidth: "221px",
      display: "block",

    }
  };

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

function logOut() {
  API.logout()
    .then(() => {
     dispatch({
       type: LOGOUT,
       user: ''
     });
    })
    .catch((err) => {console.log(err)})
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
                          <div className="item-income">
                            <div className="text-center text-white pt-5">
                              <h2>${state.sumTransactions.income}</h2>
                              <h4 className="text-uppercase">Total Income</h4>
                              <ion-icon name="cash-outline" size="large"></ion-icon>
                            </div>
                          </div>
                          <div className="item-travel">
                          <div className="text-center text-white pt-5">
                              <h2>${state.sumTransactions.travel}</h2>
                              <h4 className="text-uppercase">Travel Expenses</h4>
                              <ion-icon name="airplane-outline" size="large"></ion-icon>
                            </div>
                          </div>
                          <div className="item-bills">
                          <div className="text-center text-white pt-5">
                              <h2>${state.sumTransactions.utilities}</h2>
                              <h4 className="text-uppercase">Bills & Utilities</h4>
                              <ion-icon name="construct-outline" size="large"></ion-icon>
                            </div>
                          </div>
                          <div className="item-signout">
                              <div className="row">
                                  <div className="col-sm-12 text-white">
                                      <h3 className="text-uppercase text-white" onClick={() => {logOut()}}>Sign Out</h3>
                                      <ion-icon name="log-out-outline" size="large"></ion-icon>
                                  </div>
                              </div> 
                          </div>
                          <div className="item-addTransactions">
                          <div className="text-center text-white pt-5">
                              <h3 onClick={(event) => {handleNavClick(event)}} nav-value="transaction">Add Transactions</h3>
                              <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            </div>
                          </div>
                          <div className="item-groceries">
                          <div className="text-center text-white pt-5">
                              <h2>${state.sumTransactions.groceries}</h2>
                              <h4 className="text-uppercase">Groceries</h4>
                              <ion-icon name="cart-outline" size="large"></ion-icon>
                            </div>
                          </div>

                          <div className="item-goals">
                            <div className="text-center text-white pt-5">
                                  <h3 className="text-uppercase" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals & Budget</h3>
                                  <h4 className="text-uppercase">Check in on the status of your budget and savings goals.</h4>
                                  <ion-icon name="bar-chart-outline" size="large"></ion-icon>
                            </div>
                          </div>
                          <div className="item-goals">
                            <div className="text-center text-white pt-5">
                                  <h3 className="text-uppercase" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</h3>
                                  <h4 className="text-uppercase">Catch a glimpse of Wall St.</h4>
                                  <ion-icon name="trending-up-outline" size="large"></ion-icon>
                            </div>
                          </div>
                          <div className="item-barsAndRestaurants">
                            <div className="text-center text-white pt-5">
                                <h2>${state.sumTransactions.barsRestaurant}</h2>
                                <h4 className="text-uppercase">Bars & Restaurants</h4>
                                <ion-icon name="beer-outline" size="large"></ion-icon>
                            </div>
                          </div>
                          <div className="item-rent">
                          <div className="text-center text-white pt-5">
                              <h2>${state.sumTransactions.mortgageRent}</h2>
                              <h4 className="text-uppercase">Mortgage & Rent</h4>
                              <ion-icon name="home-outline" size="large"></ion-icon>
                            </div>
                            </div> 
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




