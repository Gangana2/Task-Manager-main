import React from 'react'; 
import axios from 'axios'; 
 
function TaskItem({ task, onTaskUpdated, onTaskDeleted }) { 
    const toggleStatus = async () => { 
        try { 
          const response = await axios.put(`http://localhost:3000/api/tasks/${task._id}/toggle`); 
          onTaskUpdated(response.data); 
        } catch (error) { 
          console.error('Error toggling task status:', error); 
        } 
      }; 
     
      const deleteTask = async () => { 
        try { 
          await axios.delete(`http://localhost:3000/api/tasks/${task._id}`); 
          onTaskDeleted(task._id); 
        } catch (error) { 
          console.error('Error deleting task:', error); 
        } 
      }; 
     
      return ( 
        <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}> 
          <span className="task-title">{task.title}</span> 
          <div className="task-actions"> 
            <button onClick={toggleStatus} className="btn-toggle"> 
    {task.status === 'completed' ? '↩ Mark Pending' : '✓ Mark Complete'} 
            </button> 
            <button onClick={deleteTask} className="btn-delete">
     🗑
     Delete</button> 
          </div> 
        </div> 
      ); 
    } 
     
    export default TaskItem; 