import React from 'react';

const Login = () => {

    return (
        <div className="row">
            Welcome to Tile Master Finances. Sign in to get started.
            
            <div className="col-md-6 offset-md-3">
            <form>
                <div className="form-group">
                    <label htmlFor="emailInput">Email address</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />

                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" className="form-control" id="passwordInput" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Login;
