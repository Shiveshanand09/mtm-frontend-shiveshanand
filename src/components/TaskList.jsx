import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [taskData, setTaskData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskData(tasks);
  }, []);

  const onDelete = (taskId) => {
    const updatedTasks = taskData.filter((task) => task.id !== taskId);
    setTaskData(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const onEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const addTask = (task) => {
    const updatedTasks = [...taskData, task];
    setTaskData(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleSave = () => {
    const updatedTasks = taskData.map((task) =>
      task.id === selectedTask.id ? selectedTask : task
    );
    setTaskData(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <>
      <TaskForm addTask={addTask} />
      <div className="task-list">
        <h3 className="display-4">Tasks list</h3>
        <div className="task-list__content">
          {taskData.length ? (
            taskData.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>
      {selectedTask && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          tabIndex="-1"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="task-title"
                      value={selectedTask.title}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="task-description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="task-description"
                      value={selectedTask.description}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
