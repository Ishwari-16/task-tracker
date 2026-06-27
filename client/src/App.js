import "./styles/App.css";
import React, { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [darkMode,setDarkMode]=useState(false);
  useEffect(()=>{

  const theme=localStorage.getItem("theme");
  if(theme==="dark"){
  setDarkMode(true);
  }
  },[]);
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={darkMode?"container dark":"container"}>
      <div className="header">
        <div style={{textAlign:"right",marginBottom:"20px"}}>

        <button
        className="themeBtn"
        onClick={()=>setDarkMode(!darkMode)}
        >
        {
        darkMode
        ?
        <FaSun/>
        :
        <FaMoon/>
        }
        </button>
        </div>
        <h1>📝 Task Tracker</h1>
        <p>Organize your daily work efficiently</p>
      </div>

      <TaskForm
        fetchTasks={fetchTasks}
        editTask={editTask}
        setEditTask={setEditTask}
      />

      <hr />

      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        setEditTask={setEditTask}
      />
    </div>
  );
}

export default App;