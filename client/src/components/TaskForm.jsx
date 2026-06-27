import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";
import { FaPlus } from "react-icons/fa";

function TaskForm({ fetchTasks,editTask,setEditTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const formRef = useRef(null);
  useEffect(() => {
  if (editTask) {
    setTitle(editTask.title);
    setDescription(editTask.description);
    setStatus(editTask.status);
    setDueDate(
      editTask.dueDate
        ? editTask.dueDate.substring(0, 10)
        : ""
    );
  }
}, [editTask]);
  const submitHandler = async (e) => {
  e.preventDefault();

  try {

    if (editTask) {

      await API.put(`/tasks/${editTask._id}`, {
        title,
        description,
        status,
        dueDate
      });

      setEditTask(null);
      alert("Task Updated Successfully!");

    } else {

      await API.post("/tasks", {
        title,
        description,
        status,
        dueDate
      });

      alert("Task Added Successfully!");
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setDueDate("");

    fetchTasks();

  } catch (error) {

    alert("Something went wrong");

  }
  formRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
});
};

  return (
    <form
      ref={formRef}
      className="form"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      ></textarea>
      <label>Status</label>

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
    <option>Pending</option>
    <option>In Progress</option>
    <option>Completed</option>
    </select>

    <br />
    <br />
    <label>Due Date</label>

    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />

    <br />
    <br />
      <button type="submit">
        <FaPlus /> {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;