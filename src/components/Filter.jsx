import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const Filter = () => {
  const { setFilter } = useTaskContext();

  return (
    <div className="mb-4 ">
      <button onClick={() => setFilter('all')} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Todas</button>
      <button onClick={() => setFilter('completed')} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Completadas</button>
      <button onClick={() => setFilter('pending')} className="bg-red-500 text-white px-4 py-2 rounded">Pendientes</button>
    </div>
  );
};

export default Filter;
