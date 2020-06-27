import React, { useRef } from 'react';
import API from '../utils/API';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    
    function handleLoginBtnClick(event) {
        event.preventDefault();
        if (!emailRef.current.value || !passwordRef.current.value) {
            return alert('Please enter your email and password to sign in.');
        } 
        checkEmail(emailRef.current.value);

        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

      // Loads all books and sets them to books
  function checkEmail(email) {
    API.getUserByEmail(email)
      .then(res => 
        console.log(res.data)
      )
      .catch(err => console.log(err));
  };


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
