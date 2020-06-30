import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import { LOGIN } from '../utils/actions';

const Goals = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
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
            {loading ?
                <div>Loading... Please wait.</div>
                :
            <div>{state.user ? <div>goals page</div> : <Redirect to="/login" />}</div>
            }
        </div>
    );
};

export default Goals;