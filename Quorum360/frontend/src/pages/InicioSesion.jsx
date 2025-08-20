import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faExclamationCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '@/styles/InicioSesion.css';

const InicioSesion = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ajusta la URL de tu backend aquí
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
          tipo: userType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Si el backend responde con error, mostramos mensaje
        setError(data.message || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      // Login exitoso: data podría incluir token, info usuario, tipo, etc.
      // Por ejemplo, guardar token en localStorage:
      if(data.token) {
        localStorage.setItem('token', data.token);
      }

      // Redirigir según tipo de usuario recibido o seleccionado
      const redirectTo = userType === 'adminconfig/dashboard' ? '/admin/dashboard' : 'manage/user';
      navigate(redirectTo);

    } catch (err) {
      setError('Error en la conexión con el servidor');
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`En una implementación real, esto redirigiría a autenticación con ${provider}`);
  };

  const handleForgotPassword = () => {
    if (email) {
      alert(`Se enviará un enlace de recuperación a ${email}`);
    } else {
      alert('Por favor ingresa tu correo electrónico primero');
    }
  };

  return (
    <div className="login-container">
      <div className="login-hero">
        <div className="login-hero-content">
          <h1>Bienvenido a Quorum360</h1>
          <p>La solución integral para la gestión eficiente de propiedades horizontales</p>
          <div className="login-logo">
            <Link to="/" className="logo-inicio">
              <img src="/src/assets/images/Q360.png" alt="Quorum360" loading="lazy" className="logo-img" />
            </Link>
          </div>
        </div>
      </div>

      <div className="login-form-container">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para acceder al sistema</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <FontAwesomeIcon icon={faExclamationCircle} /> {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType" className="form-label">Tipo de Usuario</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Seleccionar...</option>
              <option value="admin">Administrador</option>
              <option value="residente">Residente</option>
              <option value="proveedor">Proveedor</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FontAwesomeIcon icon={faSignInAlt} /> {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </div>

          <div className="form-group text-center">
            <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        <div className="social-login">
          <p>o inicia sesión con</p>
          <div className="social-buttons">
            <a href="#" className="social-btn btn-google" onClick={() => handleSocialLogin('Google')}>
              <span><FontAwesomeIcon icon={faGoogle} /> Google</span>
            </a>
            <a href="#" className="social-btn btn-facebook" onClick={() => handleSocialLogin('Facebook')}>
              <span><FontAwesomeIcon icon={faFacebookF} /> Facebook</span>
            </a>
          </div>
        </div>

        <div className="login-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="register-link">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
