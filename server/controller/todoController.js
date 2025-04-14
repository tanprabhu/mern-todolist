const express = require('express');
const router = express.Router();
const todoService = require('../service/todoService');

router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const newTodo = await todoService.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error in POST/todos:',err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

router.get('/', async (req, res) => {
  try{
    const todos = await todoService.getTodos();
    res.json(todos);
  } 
  catch{
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
    
});

router.put('/:id', async (req, res) => {
  try{
    const updated = await todoService.updateTodo(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  }
  catch{
    res.status(500).json({ error: 'Failed to update todos' });
  }
  
});

router.delete('/:id', async (req, res) => {
  try{
    const success = await todoService.deleteTodo(req.params.id);
    if(!success) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  }
  catch{
    res.status(500).json({ error: 'Failed to delete todos' });
  }

});

module.exports = router;
