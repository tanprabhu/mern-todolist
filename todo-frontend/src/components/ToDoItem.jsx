
const ToDoItem = ({ todo, onUpdate, onDelete }) => (
  <div className="todo-item">
    <div className="todo-main">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
      />

      <span style={{
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}
      >{todo.title}
      </span>
    </div>
    <button className="delete-btn" onClick={() => onDelete(todo._id)}>Delete</button>
  </div>
);

export default ToDoItem;