import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const { register } = useAuthContext(); // Agregaremos esta función en AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password });
      Swal.fire('Registro exitoso', 'Puedes iniciar sesión ahora.', 'success');
      navigate('/login'); // Redirige al login después del registro
    } catch (error) {
      console.error('Error al registrarse:', error);
      Swal.fire('Error', 'No se pudo registrar el usuario.', 'error');
    }
  };

  return (
    <div className="max-w-md flex flex-col justify-center  h-screen bg-gray-200">
      <h2 className="text-2xl font-bold mb-4 ml-14">Registrar</h2>
      <form onSubmit={handleSubmit} className=" bg-gray-400 shadow-2xl flex flex-col p-4 border rounded">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-2 border rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-2 border rounded"
          placeholder="Contraseña"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Registrar
        </button>
      </form>
      <p className="mt-2 text-center">
        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;
