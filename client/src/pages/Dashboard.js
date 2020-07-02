import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import API from '../utils/API';
import { LOGIN, LOGOUT } from '../utils/actions';
import '../App.css';


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStoreContext();
  let history = useHistory();


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
    
    useEffect(() => {
      const script = document.createElement("script");

      script.src = "./js/multiple.js";
      script.async = true;
  
      document.body.appendChild(script);
      
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
                      <div className="tiles">
                          <div className="item color">item 1</div>
                          <div className="item">item 2</div>
                          <div className="item">item 3</div>
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
                      {/* <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</button>
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals</button>
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="transaction">Add Transactions</button>
                      <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="dashboard">Dashboard</button>
                      <button className="btn btn-info" onClick={() => {handleSignOut()}} nav-value="dashboard">Sign Out</button> */}
                  </div>  : 
                  <Redirect to="/login" />
              }
          </div>
          }
      </div>
  );
};

export default Dashboard;




