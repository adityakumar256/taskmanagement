const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Add task
router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    userId: req.userId
  });
  await task.save();
  res.json(task);
});

// Get all tasks of logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
