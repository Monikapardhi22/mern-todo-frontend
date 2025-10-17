const express = require("express");
const Todo = require("../models/todoModel");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

router.post("/", auth, async (req, res) => {
  const todo = new Todo({ text: req.body.text, userId: req.user.id });
  await todo.save();
  res.json(todo);
});

router.delete("/:id", auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
