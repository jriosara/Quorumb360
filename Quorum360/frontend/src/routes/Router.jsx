import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Layout from '../components/layouts/Layout';
import InicioSesion from '@/pages/InicioSesion';
import RegistroUsuario from '@/pages/RegistroUsuario';
import ProtectedRoute from '@/components/navigation/ProtectedRoute';
import AdminconfigDashboard from '@/pages/AdminconfigDashboard';
import GestionAdmin from '@/pages/GestionAdmin';
import ForgotPassword from '@/pages/auth/ForgotPassword'; // Importa el nuevo componente
import ResetPassword from '@/pages/auth/ResetPassword'; // Importa el nuevo componente

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'layout', element: <Layout /> },
      { path: 'login', element: <InicioSesion /> },
      { path: 'register', element: <RegistroUsuario /> },
      {
        path: 'adminconfig/dashboard',
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <AdminconfigDashboard />
          </ProtectedRoute>
        ),
      },
      // Agrega las nuevas rutas para el manejo de contraseñas
      {
        path: 'login/manage/user',
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <GestionAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;