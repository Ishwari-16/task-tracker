import React from "react";
import API from "../services/api";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";

function TaskList({ tasks, fetchTasks, setEditTask }) {

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div
      style={{
      border:"4px solid #6d28d9",
      padding:"25px",
      borderRadius:"18px",
      background:"white",
      marginTop:"30px"
    }}
    >
      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid gray",
              marginTop: "15px",
              padding: "15px",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              
          <span
              className={`status ${
              task.status==="Pending"
              ?"pending"
              :task.status==="In Progress"
              ?"progress"
              :"completed"
              }`}
            >
            {task.status}
          </span>
            </p>
            <p>
              <FaCalendarAlt/>
              {task.dueDate
                ?
                new Date(task.dueDate).toLocaleDateString()
                :
                "No Due Date"
              }
            </p>
            <button
  className="edit"
  onClick={() => {
    console.log("Edit clicked");
    console.log(task);
    setEditTask(task);
  }}
>
  <FaEdit /> Edit
</button>

            {" "}

            <button
              className="delete"
              onClick={()=>deleteTask(task._id)}
            >
              <FaTrash/>
              Delete
              </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;