import './App.css';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import Filter from './components/Filter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register'; // Importa el componente Register
import LogoutButton from './components/LogoutButton'; // Crea este componente más adelante
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { token } = useAuthContext();

  return (
    <Router>
      <div className='  flex justify-center items-center min-h-screen w-screen bg-gray-200'>
      <div className="  p-4 border-4  ">
        <h1 className="text-3xl font-bold text-center">Task Manager</h1>
        {token ? (
          <>
            <div className="flex justify-end mb-4">
              <LogoutButton />
            </div>
            <Filter />
            <TaskForm />
            <TaskList />
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
      </div>
    </Router>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  );
}

export default AppWrapper;
