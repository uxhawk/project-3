import React, { useEffect, useState, useRef } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { Redirect, useHistory } from 'react-router-dom';
import API from '../utils/API';
import { LOGIN, ADD_TRANSACTION, GET_TRANSACTIONS } from '../utils/actions';
import HomeButton from '../components/HomeButton';

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

        if(amountRef.current.value === 0 || detailsRef.current.value === 0) {
            return alert('Please enter values for all fields.')
        }
        const transaction = {
            amount: amountRef.current.value,
            date: new Date(Date.now()).toLocaleString(),
            category: categoryRef.current.value,
            details: detailsRef.current.value,
            userId: state.user,
        }
        API.submitTransaction(state.user, transaction)
            .then(() => {
                getTransactions();
            amountRef.current.value = '';
            categoryRef.current.value = 'income';
            detailsRef.current.value = '';
            
            })
            .catch((err) => console.log(err));
    }


    function handleNavClick(event) {
        const destination = event.target.getAttribute('nav-value');
        history.push(`/${destination}`);
    }

    function getTransactions() {
        API.getTransactions(state.user)
            .then((res) => {
                dispatch({
                    type: GET_TRANSACTIONS,
                    userFinancials: res.data[0].userFinancials,
                });
            })
            .catch((err) => console.log(err));
            console.log(state.userFinancials);
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
                // getTransactions();
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
                        <HomeButton />
                        <div className="row">
                            <div className="col-lg-4 offset-lg-4">
                                <form className="mt-5 gradient p-5">
                                    <input type="number" id="transactionAmount" className="form-control mb-3" placeholder="Amount" required="" autoFocus="" ref={amountRef}/>                                            
                                    <select id="category" className="form-control mb-3" ref={categoryRef}>
                                        <option value="income">Income</option>
                                        <option value="barsRestaurant">Bar/Restaurant</option>
                                        <option value="travel">Travel</option>
                                        <option value="groceries">Grocery Store</option>
                                        <option value="utilities">Bill</option>
                                        <option value="mortgageRent">Mortgage/Rent</option>
                                    </select> 
                                    {/* <textarea className="form-control mb-3" aria-label="With textarea" placeholder="Transaction notes and details" ref={detailsRef}></textarea> */}
                                    <button className="btn btn-raised btn-white btn-block mt-4" type="submit" onClick={(event) => {submitForm(event)}}>Add Transaction</button>
                                </form>
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



export default Transaction;






