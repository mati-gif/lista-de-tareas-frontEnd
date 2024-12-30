import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import Swal from 'sweetalert2';
const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete, updateTask } = useTaskContext();
  const {showDetails,details} = useTaskContext();
  const {detailss} = useTaskContext();
  console.log(detailss);
  


  // const showDetailss = (task)=>{
  //   showDetails(task);
  //   console.log(details);
  //   console.log(task._id);
    
  // }

  const showDetailss = async (task) => {
    try {
      const details = await showDetails(task); // Obtén los detalles directamente
      console.log(details); // Asegúrate de que los detalles son correctos
      Swal.fire({
        title: `<strong>${details.title}</strong>`,
        html: `
          <p><strong>Descripción:</strong> ${details.description}</p>
          <p><strong>Fecha de creación:</strong> ${new Date(details.createdAt).toLocaleString()}</p>
          <p><strong>Estado:</strong> ${details.completed ? 'Completada' : 'Pendiente'}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    } catch (error) {
      console.error('Error fetching task details:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los detalles de la tarea.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  };


  const handleEdit = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar tarea',
      html: `
        <input id="swal-input-title" class="swal2-input" placeholder="Título" value="${task.title}">
        <textarea id="swal-input-description" class="swal2-textarea" placeholder="Descripción">${task.description}</textarea>
        <label>
          <input id="swal-input-completed" type="checkbox" ${task.completed ? 'checked' : ''}> Completada
        </label>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById('swal-input-title').value;
        const description = document.getElementById('swal-input-description').value;
        const completed = document.getElementById('swal-input-completed').checked;

        if (!title || !description) {
          Swal.showValidationMessage('Por favor completa todos los campos');
          return null;
        }

        return { title, description, completed };
      }
    });

    if (formValues) {
      try {
        await updateTask(task._id, formValues); // Llama al contexto para actualizar la tarea
        Swal.fire('Tarea actualizada', 'La tarea se editó exitosamente', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar la tarea', 'error');
        console.error('Error updating task:', error);
      }
    }
  };
  
  
  return (
    <li className="flex justify-between items-center p-4 ">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.createdAt}</p>
        <p className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </p>
      </div>
      <div>
        <button
          onClick={() => toggleComplete(task._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        >
          {task.completed ? 'Marcar pendiente' : 'Marcar completada'}
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>
        <button   onClick={() => showDetailss(task)} className="bg-purple-500 text-white px-3 py-1 rounded ml-2"
        >
          Detalles
        
        </button>

        <button onClick={handleEdit} className="bg-orange-500 text-white px-3 py-1 rounded ml-2"
        >
          Editar
        
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
