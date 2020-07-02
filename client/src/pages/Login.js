import React, { useRef, useEffect, useState } from 'react';
import API from '../utils/API';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect, useHistory } from 'react-router-dom';
import { LOGIN } from '../utils/actions';

const Login = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useStoreContext();
    let history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    
    function handleSignupBtnClick(event) {
        event.preventDefault();
        history.push(`/signup`);
    }
    
    function handleLoginBtnClick(event) {
        // prevent the default behavior from happening on form submit
        event.preventDefault();
        
        // if there is not an email or password,
        // throw an alert to prevent anything from happening
        if (!emailRef.current.value || !passwordRef.current.value) {
            return alert('Please enter your email and password to sign in.');
        } 

        // if there is data in the fields, run the checkEmail function and clear the input fields
        checkEmail(emailRef.current.value, passwordRef.current.value);
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

        // Loads all books and sets them to books
        function checkEmail(email, password) {
            API.register_login(email, password)
            .then(async res => dispatch({
                    type: LOGIN,
                    userID: res.data._id,
                    userFinancials: res.data.userFinancials
                })
            )
            .catch(err => console.log(err));
        };

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
        {loading ? <div>Loading... Please wait.</div> :
        <div>
            {
            state.user ? 
            <Redirect to="/dashboard" />  : 
                        <div className="row text-center">
                        {/* <h2>Welcome to Tile Master Finances. Sign in to get started.</h2> */}
                        <div className="col-md-4 offset-md-4 mt-4">
                            <form className="form-signin" >
                                    <img className="mb-4" src="https://via.placeholder.com/140x100" alt="" width="140" height="100" />
                                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" ref={emailRef}/>
                                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" ref={passwordRef}/>
                                    <button className="btn btn-lg btn-primary btn-block mt-4" type="submit" onClick={(event) => {handleLoginBtnClick(event)}}>Sign in</button>
                                    <p className="mt-4 mb-1">Don't have an account yet?</p>
                                    <button className="btn btn-lg btn-info btn-block mt-1" type="submit" onClick={(event) => {handleSignupBtnClick(event)}}>Take me to Sign Up</button>
                            </form>
                        </div>
                    </div>
            }
        </div>
        }
    </div>
);
};

export default Login;



