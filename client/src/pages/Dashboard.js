import React, { useEffect } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [state, dispatch]= useStoreContext();
    let history = useHistory();


    if (state.user === '') {
      return <Redirect to="/login" />; 
    }
    
    useEffect(() => {
      console.log(state.user);
    })

    function handleNavClick(event) {
      const destination = event.target.getAttribute('nav-value');
      console.log(destination);
      history.push(`/${destination}`);
    }

    return (
        <div>
            Welcome user
            <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</button>
            <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals</button>
            <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Add Transactions</button>
        </div>
    );
};

export default Dashboard;