import axios from 'axios';

const API_URL ='http://localhost:3000/todos';

export const getTodos = () => axios.get(API_URL);
export const addTodo = (todo) => axios.post(API_URL, todo);
export const updateTodos = (id, updates) => axios.put(`${API_URL}/${id}`, updates);
export const deleteTodos = (id) => axios.delete(`${API_URL}/${id}`);