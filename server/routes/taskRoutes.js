const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", createTask);

//router.get("/", getTasks);

router.get("/tasks", async (req,res)=>{
  const tasks = await Task.find();
  res.json(tasks);
});

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;