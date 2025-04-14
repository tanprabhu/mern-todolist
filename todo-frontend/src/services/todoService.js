import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

export const getTodos = () => axios.get(API_BASE);
export const addTodo = (todo) => axios.post(API_BASE, todo);
export const updateTodos = (id, updates) => axios.put(`${API_BASE}/${id}`, updates);
export const deleteTodos = (id) => axios.delete(`${API_BASE}/${id}`);