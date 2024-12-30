import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      Swal.fire('Login exitoso', 'Has iniciado sesión correctamente.', 'success');
      navigate('/'); // Redirige a la página principal después del login
    } catch (error) {
      Swal.fire('Error', 'Credenciales incorrectas o problema con el servidor.', 'error');
    }
  };

  return (
    <div className="max-w-md flex flex-col justify-center  h-screen bg-gray-200">
      <h2 className="text-2xl font-bold mb-4 ml-10">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className=" bg-gray-400 shadow-2xl flex flex-col p-4 rounded">
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-2 text-center">
        ¿No tienes una cuenta? <Link to="/register" className="text-blue-500">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
