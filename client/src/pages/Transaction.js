import React, { useEffect, useState, useRef } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect, useHistory } from 'react-router-dom';
import API from '../utils/API';
import { LOGIN } from '../utils/actions';

const Transaction = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useStoreContext();
    let history = useHistory();

    // ref for inputs from the form
    const amountRef = useRef();
    const categoryRef = useRef();
    const dateRef = useRef();
    const detailsRef = useRef();

    // function to submit form 
    function submitForm(event) {
        event.preventDefault();

        const transaction = {
            amount: amountRef.current.value,
            date: dateRef.current.value,
            category: categoryRef.current.value,
            details: detailsRef.current.value
        }
        console.log(transaction);
    }


    function handleNavClick(event) {
        const destination = event.target.getAttribute('nav-value');
        history.push(`/${destination}`);
    }

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
                    <div>
                        Transaction
                        <div className="row">
                            <div className="col-lg-4 offset-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        Add transactions and payments to track your budget
                                        <form>
                                            <input type="number" id="transactionAmount" className="form-control" placeholder="$$$" required="" autoFocus="" ref={amountRef}/>
                                            <input type="number" id="transactionAmount" className="form-control" placeholder="Transaction Date" required="" autoFocus="" ref={dateRef}/>
                                            
                                            <select id="category" className="form-control" ref={categoryRef}>
                                                <option value="income">Income</option>
                                                <option value="bar/restaurant">Bar/Restaurant</option>
                                                <option value="travel">Travel</option>
                                                <option value="groceries">Grocery Store</option>
                                                <option value="utilities">Bill</option>
                                                <option value="mortgage/rent"></option>
                                            </select> 
                                            <textarea className="form-control" aria-label="With textarea" placeholder="Transaction notes and details" ref={detailsRef}></textarea>
                                            <button className="btn btn-primary" type="submit" onClick={(event) => {submitForm(event)}}>Add Transaction</button>
                                          
                                            

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>  : 
                    <Redirect to="/login" />
                }
            </div>
            }
        </div>
    );
};

{/* <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="stock-market">Stock Market</button>
<button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="goals">Goals</button>
<button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="transaction">Add Transactions</button>
<button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="dashboard">Dashboard</button> */}

export default Transaction;






