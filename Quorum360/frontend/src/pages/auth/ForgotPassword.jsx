import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '@/styles/ForgotPassword.css'; // Asegúrate de que la ruta sea correcta

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!email) {
        setError('Por favor ingresa tu correo electrónico');
        return;
        }

        // Aquí iría la llamada a tu API para enviar el correo de recuperación
        // Simulamos una respuesta exitosa después de 1 segundo
        setError('');
        setTimeout(() => {
        setIsSubmitted(true);
        }, 1000);
    };

    return (
        <div className="forgot-password-container">
        <div className="forgot-password-card">
            <button onClick={() => navigate(-1)} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
            </button>

            <div className="forgot-password-header">
            <h2>Recuperar Contraseña</h2>
            <p>
                {isSubmitted
                ? `Hemos enviado un enlace de recuperación a ${email}. Por favor revisa tu bandeja de entrada.`
                : 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.'}
            </p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-with-icon">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    />
                </div>
                </div>

                <button type="submit" className="btn btn-primary">
                Enviar Enlace de Recuperación
                </button>
            </form>
            ) : (
            <div className="success-message">
                <p>
                ¿No recibiste el correo?{' '}
                <button onClick={() => setIsSubmitted(false)} className="resend-link">
                    Reenviar enlace
                </button>
                </p>
                <Link to="/login" className="back-to-login">
                Volver al inicio de sesión
                </Link>
            </div>
            )}
        </div>
        </div>
    );
};

export default ForgotPassword;