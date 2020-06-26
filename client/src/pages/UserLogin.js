import React from 'react';

const UserLogin = () => {
    function handleBtnClick() {
        console.log('hello');
    }
    return (
        <div>
            Welcome to Tile Master Finances. Sign in to get started.
            <div id="my-signin2" onClick={() => {handleBtnClick()}}></div>
        </div>
    );
};

export default UserLogin;