require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',                    // local Vite dev server
    'https://mern-todolist-seven.vercel.app'    // deployed frontend
  ],
  methods:['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const todoRoutes = require('./controller/todoController');
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
