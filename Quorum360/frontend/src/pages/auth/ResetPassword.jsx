import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '@/styles/ForgotPassword.css'; // Reutilizamos los estilos

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    // const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validaciones
        if (!password || !confirmPassword) {
        setError('Por favor completa ambos campos');
        return;
        }
        
        if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
        }
        
        if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres');
        return;
        }

        // Aquí iría la llamada a tu API para restablecer la contraseña
        // Simulamos una respuesta exitosa después de 1 segundo
        setError('');
        setTimeout(() => {
        setIsSuccess(true);
        setTimeout(() => {
            navigate('/login');
        }, 3000);
        }, 1000);
    };

    return (
        <div className="forgot-password-container">
        <div className="forgot-password-card">
            <div className="forgot-password-header">
            <h2>Restablecer Contraseña</h2>
            <p>
                {isSuccess
                ? '¡Contraseña actualizada con éxito! Redirigiendo al inicio de sesión...'
                : 'Ingresa tu nueva contraseña y confírmala para continuar.'}
            </p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {!isSuccess ? (
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <div className="form-group">
                <label htmlFor="password">Nueva Contraseña</label>
                <div className="input-with-icon">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    />
                </div>
                </div>

                <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <div className="input-with-icon">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    />
                </div>
                </div>

                <button type="submit" className="btn btn-primary">
                Restablecer Contraseña
                </button>
            </form>
            ) : (
            <div className="success-message">
                <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            </div>
            )}
        </div>
        </div>
    );
};

export default ResetPassword;