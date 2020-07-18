import React, {useRef, useEffect, useState} from 'react';
import API from '../utils/API';
import {useStoreContext} from '../utils/GlobalState';
import {NEW_USER, LOGIN} from '../utils/actions';
import {Redirect, useHistory} from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStoreContext();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  /**
   * routes the user back to the login page
   * @param {event} event gets the data attribute to know where to route
   */
  function handleLoginBtnClick(event) {
    event.preventDefault();
    history.push(`/login`);
  }

  /**
   * function to kick off the account creation process
   * @param {event} event prevents default form submit
   * @return {alert} alert if the user doesn't enter a valid email
   */
  function handleSignupBtnClick(event) {
    // prevent the default behavior from happening on form submit
    event.preventDefault();

    // if there is not an email or password,
    // throw an alert to prevent anything from happening
    if (!emailRef.current.value || !passwordRef.current.value) {
      return alert('Please enter your email and password to sign in.');
    }

    // eslint-disable-next-line max-len
    const regex = RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

    if (!regex.test(emailRef.current.value)) {
      emailRef.current.value = '';
      passwordRef.current.value = '';
      return alert('Please enter a valid email to sign up.');
    }


    // if there is data in the fields,
    // run the signupUser function and clear the input fields
    signupUser(emailRef.current.value, passwordRef.current.value);
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }

  /**
 * functio to create an account for a new user
 * @param {email} email the input field value
 * @param {*} password the input field value
 */
  function signupUser(email, password) {
    API.register_login(email, password)
        .then((res) =>
          dispatch({
            type: NEW_USER,
            userID: res.data._id,
          }),
        )
        .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (state.user) {
      setLoading(false);
    } else {
      API.get_credentials().then((res) => {
        dispatch({
          type: LOGIN,
          userID: res.data,
        });
        // console.log(`User ID: ${res.data}`);
      }).catch((err) => {
        console.log(err);
      }).finally((_) => {
        setLoading(false);
      });
    }
  }, []);

  if (state.user !== '') {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      {loading ? <div>Loading... Please wait.</div> :
        <div>
          {
            state.user ?
            <Redirect to="/dashboard" /> :
            <div className="row text-center">
              <div className="col-md-4 offset-md-4 mt-4">
                <form className="form-signin form-signin mt-5 gradient p-5">
                  <h1 className="h3 mb-3 text-white ">Create New Account</h1>
                  <input type="text" id="inputEmail"
                    className="form-control mb-3"
                    placeholder="Email address" required=""
                    autoFocus="" ref={emailRef}/>
                  <input type="password" id="inputPassword"
                    className="form-control" placeholder="Password"
                    required="" ref={passwordRef}/>
                  <button className="btn btn-raised btn-white btn-block mt-4"
                    type="submit" onClick={(event) => {
                      handleSignupBtnClick(event);
                    }}>Create Account</button>
                  <p className="mt-4 mb-1 text-white">Already a member?</p>
                  <button className="btn btn-primary btn-raised btn-block mt-1"
                    type="submit" onClick={(event) => {
                      handleLoginBtnClick(event);
                    }}>Take me to Login</button>
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
