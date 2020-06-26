import React from 'react';

const UserLogin = () => {
    function handleBtnClick() {
        console.log('hello');
    }

    return (
        <div>
            Welcome to Tile Master Finances. Sign in to get started.
            <a href="/auth/google" className="btn btn-danger" onClick={() => {handleBtnClick()}}>Login With Google</a>
        </div>
    );
};

export default UserLogin;