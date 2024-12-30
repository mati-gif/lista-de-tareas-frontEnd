import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import Swal from 'sweetalert2';

const TaskList = () => {
  const { tasks } = useTaskContext();
  if (!Array.isArray(tasks)) {
    return <div>No hay tareas disponibles</div>;
  }

  

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <>
          <TaskItem key={task._id} task={task} />
          </>

        ))}
      </ul>
    </div>
  );
};

export default TaskList;
