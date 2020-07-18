import React, {useRef, useEffect} from 'react';
import {useStoreContext} from '../../utils/GlobalState';
import {GET_GOALS} from '../../utils/actions';
import API from '../../utils/API';
import ListItem from './ListItem';
import shortid from 'shortid';

/**
 * displays the input form to create a finance goal.
 * @return {component} the visual output of the form.
 */
function GoalsForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const [state, dispatch] = useStoreContext();

  /**
 * calls to the DB to get all user goals.
 */
  function getGoals() {
    API.getAllGoals(state.user)
        .then((res) => {
          dispatch({
            type: GET_GOALS,
            userGoals: res.data[0].userGoals,
          });
        });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch({ type: LOADING });
    const currentGoal = {
      title: titleRef.current.value,
      body: bodyRef.current.value,
      goalId: Math.random(),
    };
    API.saveGoal(state.user, currentGoal)
        .then(() => {
        //   console.log(result.data);
          getGoals();
        })
        .catch((err) => console.log(err));

    titleRef.current.value = '';
    bodyRef.current.value = '';
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3 mt-3">
          <h3>Create Goals and Budgets</h3>
          <form className="gradient p-5" onSubmit={handleSubmit}>
            <input className="form-control mb-3"
              required ref={titleRef} placeholder="Goal" />
            <textarea className="form-control mb-3"
              required ref={bodyRef} placeholder="Details" />
            <button className="btn btn-raised btn-white btn-block mt-4"
              disabled={state.loading} type="submit">
                Save Goal
            </button>
          </form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 offset-md-3 mt-3 gradient p-5 text-white">
          <h3>Financial Goals</h3>
          <ul>
            {
            state.userGoals.length === 0 ?
            <li>Create your first financial goal</li> :
              state.userGoals.map((goal) => {
                return (
                  <ListItem details={goal} key={shortid.generate()} />
                );
              })
            }
          </ul>
        </div>
      </div>

    </div>
  );
}

export default GoalsForm;
