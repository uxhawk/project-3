import React from 'react';
import API from '../../utils/API';
import { useStoreContext } from '../../utils/GlobalState';
import { GET_GOALS } from '../../utils/actions';

const ListItem = (props) => {
    const [state, dispatch] = useStoreContext();
    
    function handleDoneClick(event) {
        // console.log(typeof(event.target.getAttribute('data-id')));
        const goalId = event.target.getAttribute('data-id');
        const filteredArr = state.userGoals.filter((goal) => {
            return goal.goalId !== parseFloat(goalId);
        })

        API.updateGoals(state.user, filteredArr)
            .then(() => {
                dispatch({
                    type: GET_GOALS,
                    userGoals: filteredArr,
                })
            })
            .catch((err) => console.log(err));
    }
    
    return (
        <li className="d-flex justify-content-between align-items-center border-bottom mt-3">
            <div>
            <p className="p-0 m-0"><span className="bold">Goal Title:</span> {props.details.title}</p>
            <p className="p-0 m-0"><span className="bold">Goal Description:</span> {props.details.body}</p>
            </div>
            <button className="btn btn-raised btn-white" data-id={props.details.goalId} onClick={(event) => {handleDoneClick(event)}}><ion-icon name="checkmark-circle-outline"></ion-icon><span className="ml-2">Done</span></button>
        </li>
    );
};

export default ListItem;