import React, { useRef, useEffect } from 'react';
import API from '../utils/API';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect } from 'react-router-dom';
import { LOGIN } from '../utils/actions';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Login = () => {
    const [state, dispatch] = useStoreContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    
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
      .then(async res => {
        dispatch({
            type: LOGIN,
            userID: res.data._id,
            userFinancials: res.data.userFinancials
        });
        await sleep(2000);}
      )
      .catch(err => console.log(err));
  };

  function redirectAfterLogin() {
    if (state.user !== '') {
        return <Redirect to="/" />; 
    }
  }

  useEffect(() => {
    console.log(state.user);
    redirectAfterLogin();
  })


  if (state.user !== '') {
    return <Redirect to="/dashboard" />; 
}
    return (
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
                </form>
            </div>
        </div>

    );
};

export default Login;
