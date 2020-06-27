import React from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const [state]= useStoreContext();

    if (state.user.length === 0) {
        return <Redirect to="/login" />; 
    }
    
    return (
        <div>
            Welcome user
        </div>
    );
};

export default Dashboard;