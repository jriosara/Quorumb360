import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '@/index.css'; // Importa tu archivo CSS aquí
import logo from'@/assets/image/Q360.png'; // Asegúrate de que la ruta sea correcta

function Header() {
    return (
        <header className="header">
        <div className="logo">
            <Link to="/" className="logo-slogan">
                <img src={logo} alt="Quorum360" loading="lazy" className="logo-img" />
            </Link>
        </div>
    
        <nav className="header-nav">
            <ul className="nav-links">
                <li><NavLink to="/" className="nav-link">Inicio</NavLink></li>
                <li><a href="#about-section" className="nav-link">Quiénes Somos</a></li>
                <li><a href="#" className="nav-link">Comunidad</a></li>
                <li><a href="#" className="nav-link">Servicios</a></li>
                <li><a href="#" className="nav-link">Soporte</a></li>
                <li><a href="#" className="nav-link">Contáctanos</a></li>
            </ul>
        </nav>
    
        <div class="header-actions">
            <div class="toggle-container">
                <div class="toggle-switch" id="darkModeSwitch">
                    <i class='bx bxs-moon'></i>
                    <i class='bx bxs-sun'></i>
                    <div class="toggle-button"></div>
                </div>
            </div>
    
            <div class="auth-buttons">
                <Link to="/login" class="auth-button login">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>Iniciar Sesión</span>
                </Link>
                <Link to="/register" className="auth-button signup">
                    <i className="fas fa-user-plus"></i>
                    <span>Registrarse</span>
                </Link>
            </div>
        </div>
    </header>
    )
}

export default Header;