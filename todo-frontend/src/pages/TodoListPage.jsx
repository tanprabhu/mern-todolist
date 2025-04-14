import { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodos, deleteTodos } from '../services/todoService';
import ToDoItem from '../components/ToDoItem';
import './TodoListPage.css';

const API_BASE = import.meta.env.VITE_API_BASE;

const ToDoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    getTodos().then(res => setTodos(res.data));

  }, []);

  const handleAdd = () => {
    addTodo({ title: newTodo, completed: false })
      .then(res => {
        setTodos(prev => [...prev, res.data]);
        setNewTodo('');
      });
  };

  const handleUpdate = (id, updates) => {

    updateTodos(id, updates)
      .then(res => {
        setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));

      })
      .catch(err => {
        console.error("Update failed", err);
      });
  };

  const handleDelete = (id) => {
    deleteTodos(id).then(() => {
      setTodos(prev => prev.filter(t => t._id !== id));
    });
  };

  return (
    <div className="todo-container">
      <h1>My Todo list</h1>
      <div className='items'>
        <div className="todo-input-group">
          <input value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="What do you need to do?"
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        {todos.map(todo => (
          <ToDoItem
            key={todo._id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ToDoListPage;