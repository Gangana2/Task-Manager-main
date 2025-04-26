const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const taskSchema = require('./models/Task');
 
const app = express(); 
const port = 3000; 
 
// Middleware 
app.use(cors()); 
app.use(express.json()); 
 
// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/taskmanager', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}) 
.then(() => console.log('Connected to MongoDB Succseful')) 
.catch(err => console.error('MongoDB connection error:', err)); 

const Task = require('./models/Task'); 
 
// Get all tasks 
app.get('/api/tasks', async (req, res) => { 
  try { 
    const tasks = await Task.find().sort({ createdAt: -1 }); 
    res.json(tasks); 
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  } 
}); 

// Create a new task 
app.post('/api/tasks', async (req, res) => { 
    try { 
      const task = new Task({ 
        title: req.body.title 
      }); 
      const newTask = await task.save(); 
      res.status(201).json(newTask); 
    } catch (err) { 
      res.status(400).json({ message: err.message }); 
    } 
  }); 
   
  // Toggle task status (pending/completed) 
  app.put('/api/tasks/:id/toggle', async (req, res) => { 
    try { 
      const task = await Task.findById(req.params.id); 
      if (!task) { 
        return res.status(404).json({ message: 'Task not found' }); 
      } 
      task.status = task.status === 'pending' ? 'completed' : 'pending'; 
      const updatedTask = await task.save(); 
      res.json(updatedTask); 
    } catch (err) { 
      res.status(500).json({ message: err.message }); 
    } 
  }); 
   
  // Delete a task 
  app.delete('/api/tasks/:id', async (req, res) => { 
    try { 
      const task = await Task.findByIdAndDelete(req.params.id); 
      if (!task) { 
        return res.status(404).json({ message: 'Task not found' }); 
      } 
      res.json({ message: 'Task deleted' }); 
    } catch (err) { 
      res.status(500).json({ message: err.message }); 
    } 
  });

// Start server 
app.listen(port, () => { 
  console.log(`Server running at http://localhost:${port}`); 
});