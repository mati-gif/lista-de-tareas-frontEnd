import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      addTask({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-4  flex flex-col p-4 border-b">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 mb-2 border rounded"
        placeholder="Título de la tarea"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 mb-2 border rounded"
        placeholder="Descripción de la tarea"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Agregar tarea
      </button>
    </form>
  );
};

export default TaskForm;
