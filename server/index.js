require('dotenv').config();
const PORT = 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
  origin: 'https://mern-todolist-seven.vercel.app/'
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const todoRoutes = require('./controller/todoController');
app.use('/todos', todoRoutes);


app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
