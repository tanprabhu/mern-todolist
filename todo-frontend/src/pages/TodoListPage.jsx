import { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodos, deleteTodos } from '../services/todoService';
import ToDoItem from '../components/ToDoItem';
import './TodoListPage.css';

const ToDoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');    
  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000); // Auto-clear after 3s
  };
  

  useEffect(() => {
    getTodos()
      .then(res => {
        const data = res?.data || res;
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.warn('Unexpected API response:', data);
          setTodos([]); // fallback to prevent crash
        }
      })
      .catch(err => {
        console.error('Error fetching todos:', err);
        setTodos([]); // fallback
      });
  }, []);

  const handleAdd = () => {
    const trimmed = newTodo.trim();
    if(trimmed === ''){
      showError('Todo cannot be empty');
      return;
    }

    const isDuplicate = todos.some(todo => todo.title.toLowerCase() === trimmed.toLowerCase());

    if(isDuplicate){
      showError("Duplicate item already exists!");
      return;
    }

    addTodo({ title: trimmed, completed: false })
      .then(res => {
        setTodos(prev => [...prev, res.data]);
        setNewTodo('');
      })
      .catch(() => {
        showError('Failed to add item.');
      });
  };

  const handleUpdate = (id, updates) => {
    const trimmedTitle = updates.title?.trim();
    if(trimmedTitle){
      const duplicate = todos.find(
        todo => todo.title.toLowerCase() === trimmedTitle.toLowerCase() && todo._id!== id
      );
      if(duplicate){
        deleteTodos(id)
        .then(() => {
          setTodos(prev => prev.filter(t => t._id !== id));
          showError(`Merged with existing item: "${duplicate.title}"`);
        })
        .catch(
          err=>{
            console.error("Merge failed", err);
            showError("Error merging todos");
          }
        );
        return;
      }
    }


    updateTodos(id, updates)
      .then(res => {
        setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));

      })
      .catch(err => {
        console.error("Update failed", err);
        showError("Failed to update todo.");
      });
  };

  const handleDelete = (id) => {
    deleteTodos(id).then(() => {
      setTodos(prev => prev.filter(t => t._id !== id));
    });
  };

  return (
    <div className="todo-container">
      <h1>My To-Do list</h1>
      <div className='items'>
        <div className="todo-input-group">
          <input value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="What do you need to do?"
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {Array.isArray(todos) ? (
          todos.map(todo => (
            <ToDoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>⚠️ Could not load todos.</p>
        )}
      </div>
    </div>
  );
};

export default ToDoListPage;