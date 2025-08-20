import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF, 
    faInstagram, 
    faXTwitter, 
    faLinkedinIn, 
    faYoutube 
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
    // Establece el año actual
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <section className="newsletter">
                    <div className="newsletter-content">
                        <h2 className="newsletter-title">Suscríbete a nuestro Newsletter</h2>
                        <p className="newsletter-description">
                            Mantente al día con nuestras noticias, artículos y actualizaciones.
                        </p>
                    </div>
                    <form className="subscribe-form">
                        <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            className="subscribe-input" 
                            required 
                        />
                        <button type="submit" className="subscribe-button">
                            Suscribirse
                        </button>
                    </form>
                </section>

                <div className="footer-grid">
                    <div className="footer-logo">
                        <img 
                            src="/src/assets/images/Q360.png" 
                            alt="Quorum360 Logo" 
                            className="logo-img" 
                            loading="lazy"
                        />
                        <p className="logo-slogan">Innovación en gestión de copropiedades</p>
                    </div>

                    <nav className="footer-nav">
                        <h3 className="nav-title">Casos de Uso</h3>
                        <ul className="nav-list">
                            <li><a href="/">Ley 675</a></li>
                            <li><a href="/">Código de Convivencia</a></li>
                            <li><a href="/">Propiedad Horizontal</a></li>
                            <li><a href="/">Medio Ambiente</a></li>
                            <li><a href="/">Normas de convivencia</a></li>
                        </ul>
                    </nav>

                    <nav className="footer-nav">
                        <h3 className="nav-title">Comunidad</h3>
                        <ul className="nav-list">
                            <li><a href="/">Blog</a></li>
                            <li><a href="/">Encuestas</a></li>
                            <li><a href="/">Foro</a></li>
                            <li><a href="/">Soporte</a></li>
                        </ul>
                    </nav>

                    <nav className="footer-nav">
                        <h3 className="nav-title">Servicios</h3>
                        <ul className="nav-list">
                            <li><a href="/">Contratistas</a></li>
                            <li><a href="/">Consultoría</a></li>
                            <li><a href="/">Cotiza con nosotros</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="social-links">
                        <a href="/" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="/" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="/" aria-label="Twitter">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                        <a href="/" aria-label="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                        <a href="/" aria-label="YouTube">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </div>

                    <div className="copyright">
                        © Quorum360, Inc. {currentYear}. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;