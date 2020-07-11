import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_POST, LOADING } from "../../utils/actions";
import API from "../../utils/API";

function CreatePostForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    API.savePost({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      author: authorRef.current.value
    })
      .then(result => {
        dispatch({
          type: ADD_POST,
          post: result.data
        });
      })
      .catch(err => console.log(err));

    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  return (
    <div>
      <div className="jumbotron">
        <img
          className="img-fluid img-thumbnail"
          src="https://i.pinimg.com/originals/14/46/1b/14461b476b0c3933d35c4ad7109a77fb.jpg"
        />
      </div>
      <h1>Create your Financial Goal</h1>
      <form className="form-group mt-5 mb-5" onSubmit={handleSubmit}>
        <input className="form-control mb-5" required ref={titleRef} placeholder="Goal" />
        <textarea className="form-control mb-5" required ref={bodyRef} placeholder="Details" />
        <input className="form-control mb-5" ref={authorRef} placeholder="Name" />
        <button className="btn btn-success mt-3 mb-5" disabled={state.loading} type="submit">
          Save Goal
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
