import React from "react";

const AddTodoForm = () => {
  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add New Todo</h5>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter title"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="completed"
              name="completed"
            />
            <label className="form-check-label" htmlFor="completed">
              Completed
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-3"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default AddTodoForm;
