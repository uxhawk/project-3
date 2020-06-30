import React, { useEffect } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import { LOGIN, LOADING } from '../utils/actions';

const Goals = () => {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        dispatch({
            type: LOADING,
        });
        API.get_credentials().then(res => {
            if (res.data) {
                dispatch({
                    type: LOGIN,
                    userID: res.data
                });
                console.log(`User ID: ${res.data}`);
            } else {
                return <Redirect to="/login" />; 
            }
        })
    }, []);

    return (
        <div>
            {state.loading ? <div>Loading... Please wait.</div> : <div>goals page</div>}
        </div>
    );
};

export default Goals;