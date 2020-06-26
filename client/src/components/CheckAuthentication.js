import React from 'react';
import UserLogin from '../pages/UserLogin';
import { useStoreContext } from '../utils/GlobalState';
import UserWelcome from '../pages/UserWelcome';

const CheckAuthentication = () => {
    const [state] = useStoreContext();
    return (
        <div>
            {
            state.user.length === 0 ? <UserLogin /> : <UserWelcome />
            }
        </div>
    );
};

export default CheckAuthentication;