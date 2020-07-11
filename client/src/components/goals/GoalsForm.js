import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { GET_GOALS } from "../../utils/actions";
import API from "../../utils/API";

function GoalsForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

    function getGoals() {
        API.getAllGoals(state.user)
            .then((res) => {
                // console.log(res.data[0].userGoals);
                dispatch({
                    type: GET_GOALS,
                    userGoals: res.data[0].userGoals,
                })
            })
    }


  const handleSubmit = e => {
    e.preventDefault();
    // dispatch({ type: LOADING });
    const currentGoal = {
        title: titleRef.current.value,
        body: bodyRef.current.value
    }
    API.saveGoal(state.user, currentGoal)
      .then(() => {
        //   console.log(result.data);
          getGoals();
      })
      .catch(err => console.log(err));

    titleRef.current.value = "";
    bodyRef.current.value = "";

  };

    useEffect(() => {
        console.log(state.userGoals);
    }, []);

  return (
    <div>
      {/* <div className="jumbotron">
        <img
          className="img-fluid img-thumbnail"
          src="https://i.pinimg.com/originals/14/46/1b/14461b476b0c3933d35c4ad7109a77fb.jpg"
        />
      </div> */}
      
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
            <h1>Create your Financial Goal</h1>
            <form className="form-group mb-5" onSubmit={handleSubmit}>
              <input className="form-control mb-2" required ref={titleRef} placeholder="Goal" />
              <textarea className="form-control mb-2" required ref={bodyRef} placeholder="Details" />
              {/* <input className="form-control mb-5" ref={authorRef} placeholder="Name" /> */}
              <button className="btn btn-success" disabled={state.loading} type="submit">
                Save Goal
              </button>
            </form>
        </div>
      </div>

    </div>
  );
}

export default GoalsForm;
