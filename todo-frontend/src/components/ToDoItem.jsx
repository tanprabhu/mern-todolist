import {useState} from 'react';

const ToDoItem = ({ todo, onUpdate, onDelete}) => {
  //track whether item is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  //store updated text temporarily before saving it
  const [editText, setEditText ] = useState(todo.title);

  const handleSave = () =>{
    if(editText.trim() === '') return;

    onUpdate(todo._id, {title:editText});
    setIsEditing(false);
  };



return (
  <div className="todo-item">
    <div className="todo-main">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
      />

      {isEditing ? (
        <input
          className='edit-input'
          value={editText}
          onChange = {e => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') handleSave();
            if(e.key === 'Escape'){
              setIsEditing(false);
              setEditText(todo.title);
            }
          }}
          autoFocus
          />
      ):(
        <span style={{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}
        >{todo.title}
        </span>
      )}

     
    </div>
    {isEditing ? (
      <>
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={() => {
          setIsEditing(false);
          setEditText(todo.title);
        }}>Cancel</button>
      </>
    ):(
      <button className ="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
    )}
    
    <button className="delete-btn" onClick={() => onDelete(todo._id)}>Delete</button>
  </div>
)
};

export default ToDoItem;