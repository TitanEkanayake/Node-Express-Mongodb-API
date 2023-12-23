const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// getting all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// getting one
router.get("/:id", gettodo, (req, res) => {
  res.json(res.todo);
});
//creating one
router.post("/", async (req, res) => {
  const todo = new Todo({
    name: req.body.name,
    description: req.body.description,
    userId: req.body.userId,
    isDone: req.body.isDone,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// updating one
router.patch("/:id", gettodo, async (req, res) => {
  if (req.body.name != null) {
    res.todo.name = req.body.name;
  }
  if (req.body.description != null) {
    res.todo.description = req.body.description;
  }
  if (req.body.isDone != null) {
    res.todo.isDone = req.body.isDone;
  }
  try {
    const updatedtodo = await res.todo.save();
    res.json(updatedtodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// deleting one
router.delete("/:id", gettodo, async (req, res) => {
  try {
    await res.todo.deleteOne();
    res.json({ message: "Todo Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function gettodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "cannot find the todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.todo = todo;
  next();
}
module.exports = router;
