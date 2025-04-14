# MERN ToDo List

- A full stack ToDo List app built with MERN stack deployed on Render and Vercel.

## Live Demo
- 🔗 Frontend: [https://mern-todolist-seven.vercel.app](https://mern-todolist-seven.vercel.app)
- 🔗 Backend: [https://mern-backend-todolist.onrender.com/todos](https://mern-backend-todolist.onrender.com/todos)

## Features
- Add, update, delete todos
- Persistent storage with MongoDB Atlas
- Deployed on Vercel and Render
- Responsive and clean UI

## Set Up
1. Clone the repo
   ---
       git clone https://github.com/your-username/your-repo-name.git
       cd your-repo-name
2. Set up backend 
    ---
       cd server
       npm install
   ---
   Create a .env file in /server:
   ---
       MONGO_URI=your_mongo_connection_string
       PORT=3000
    ---
    Start backend:
      ---
        npm start
3. Set up frontend
      ---
        cd ../todo-frontend
        npm install
      ---
    Create a .env file in /todo-frontend:
      ---
        VITE_API_BASE=http://localhost:3000/todos
      ---
      Start frontend:
      ---
       npm run dev

