import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Cargar el token desde el localStorage al iniciar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // Opcional: Puedes hacer una llamada para obtener al usuario usando el token
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', credentials);
      setToken(response.data.token);
      localStorage.setItem('authToken', response.data.token); // Guardar token en Local Storage
      console.log('Login exitoso');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  const register = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', credentials);
      console.log('Registro exitoso', response);
      // Opcional: Puedes iniciar sesión automáticamente después del registro
    } catch (error) {
      console.error('Error registrando usuario:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken'); // Eliminar token de Local Storage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
