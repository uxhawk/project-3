import React, { useEffect } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
// import API from '../utils/API';
// import { LOGOUT } from '../utils/actions';

const Dashboard = () => {
    const [state, dispatch]= useStoreContext();

    // function handleSignOutClick() {
    //     API.logout()
    //         .then(() => {
    //             dispatch({
    //                 type: LOGOUT,
    //                 userFinancials: [],
    //                 user: '',
    //             })
    //         })
    // }

    // function redirectAfterLogOut() {
    //     if (state.user === '') {
    //         return <Redirect to="/" />; 
    //     }
    //   }
    
      useEffect(() => {
        // redirectAfterLogOut();
      })

    if (state.user === '') {
        return <Redirect to="/login" />; 
    }
    
    return (
        <div>
            Welcome user
        </div>
    );
};

export default Dashboard;