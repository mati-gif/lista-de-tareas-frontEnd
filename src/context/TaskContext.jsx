import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext'; // Asegúrate de importar esto

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { token } = useAuthContext();
  console.log(token);
  
  const [tasks, setTasks] = useState([]);
  const [details,setDetails] = useState({});
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (token) {
      axios.get('https://lista-de-tareas-frontend-x3am.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setTasks(response.data);
          console.log(response.data);
          
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [token]);

  const showDetails = async (task) => {
    try {
      const response = await axios.get(`https://lista-de-tareas-frontend-x3am.onrender.com/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDetails(response.data);
      return response.data; // Devuelve los detalles
    } catch (error) {
      console.error('Error fetching task details:', error);
      throw error;
    }
  };
  

  const addTask = (task) => {
    axios.post('https://lista-de-tareas-frontend-x3am.onrender.com/api/tasks', task, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`https://lista-de-tareas-frontend-x3am.onrender.com/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const updateTask = (id, updatedData) => {
    axios.put(`https://lista-de-tareas-frontend-x3am.onrender.com/api/tasks/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const toggleComplete = (id) => {
    const task = tasks.find(task => task._id === id);
    updateTask(id, { completed: !task.completed });
  };

  const filterTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks: filterTasks(),
      addTask,
      deleteTask,
      updateTask,
      toggleComplete,
      setFilter,
      showDetails,
    }}>
      {children}
    </TaskContext.Provider>
  );
};