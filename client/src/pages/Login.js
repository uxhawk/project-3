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
                    // console.log(`User ID: ${res.data}`);
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
                            <div className="col-md-4 offset-md-4 mt-4">
                                <form className="form-signin mt-5 gradient p-5" >
                                        <h1 className="h3 mb-3 text-white ">Please sign in</h1>
                                        <input type="text" id="inputEmail" className="form-control mb-3" placeholder="Email address" required="" autoFocus="" ref={emailRef}/>
                                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" ref={passwordRef}/>
                                        <button className="btn btn-raised btn-white btn-block mt-4" type="submit" onClick={(event) => {handleLoginBtnClick(event)}}>Sign in</button>
                                        <p className="mt-4 mb-1 text-white">Don't have an account yet?</p>
                                        <button className="btn btn-primary btn-raised btn-block mt-1" onClick={(event) => {handleSignupBtnClick(event)}}>Take me to Sign Up</button>
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



