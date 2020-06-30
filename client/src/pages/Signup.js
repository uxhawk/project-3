import React, { useRef, useEffect, useState } from 'react';
import API from '../utils/API';
import { useStoreContext } from '../utils/GlobalState';
import { NEW_USER, LOGIN } from '../utils/actions';
import { Redirect, useHistory } from 'react-router-dom';

const Signup = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useStoreContext();
    let history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    
    function handleLoginBtnClick(event) {
        event.preventDefault();
        history.push(`/login`);
    }
    
    function handleSignupBtnClick(event) {
        // prevent the default behavior from happening on form submit
        event.preventDefault();
        
        // if there is not an email or password,
        // throw an alert to prevent anything from happening
        if (!emailRef.current.value || !passwordRef.current.value) {
            return alert('Please enter your email and password to sign in.');
        } 

        // if there is data in the fields, run the signupUser function and clear the input fields
        signupUser(emailRef.current.value, passwordRef.current.value);
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    
      // function to send the credentials to the backend to register
  function signupUser(email, password) {
    API.register_login(email, password)
      .then(res => 
        dispatch({
            type: NEW_USER,
            userID: res.data._id,
        }),
      )
      .catch(err => console.log(err));
  }

//   function redirectAfterSignup() {
//     if (state.user !== '') {
//         return <Redirect to="/" />; 
//     }
//   }

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

//   const getPrices = (symbol) => {
//     API.getIndexPrices(symbol)
//     .then((res) => {
//         dispatch({
            
//             type: UPDATE_PRICE,
//             index: props.id,
//             currentPrice: res.data.c
//         });
//     })
//     .catch((err) => console.log(err));
// }
// useEffect(() => {
//     getPrices(props.state.symbol);
// }, []);

if (state.user !== '') {
    return <Redirect to="/dashboard" />; 
}

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
                            <h1 className="h3 mb-3 font-weight-normal">Create New Account</h1>
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" ref={emailRef}/>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" ref={passwordRef}/>
                            <button className="btn btn-lg btn-primary btn-block mt-4" type="submit" onClick={(event) => {handleSignupBtnClick(event)}}>Create Account</button>
                            <p className="mt-4 mb-1">Already a member?</p>
                            <button className="btn btn-lg btn-info btn-block mt-1" type="submit" onClick={(event) => {handleLoginBtnClick(event)}}>Take me to Login</button>
                        </form>
                        </div>
                    </div>
            }
        </div>
        }
    </div>
);
};

export default Signup;








