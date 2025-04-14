const Todo = require('../models/Todo');

async function createTodo(data) {
  const todo = new Todo({
    title: data.title,
    completed: data.completed ?? false
});
  return await todo.save();
}

async function getTodos() {
  return await Todo.find().sort({ createdAt: -1 });
}

async function updateTodo(id, newText) {
  return await Todo.findByIdAndUpdate(id, newText, { new: true });
}

async function deleteTodo(id) {
  return await Todo.findByIdAndDelete(id);
}

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
};
