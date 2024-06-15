/* eslint-disable react/prop-types */
import { useState } from "react";
const TaskForm = ({ addTask }) => {
  const getUID = () => Date.now().toString(36);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { id: getUID(), title, description };
    addTask(task);
    setTitle("");
    setDescription("");
    const alertBox = document.getElementById("success-alert");
    alertBox.style.display = "block";
    alertBox.style.opacity = 1;
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);
  };

  return (
    <div className="task-form container">
      <h1 className="text-center display-4">ITINERARY PLANNER</h1>
      <div className="task-form__content mt-4 p-4 border rounded shadow">
        <p className="lead text-center">Add your task</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              className="form-control mt-1"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="form-group my-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter task description"
              className="form-control mt-1"
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add Task
          </button>
        </form>
        <div
          id="success-alert"
          className="alert alert-success mt-4"
          role="alert"
        >
          Task added successfully
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
