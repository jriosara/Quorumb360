import React, { useState, useEffect, useRef } from 'react';
import logoPrincipal from '@/assets/image/q360_beige.png';
import dashboard from '@/assets/image/dashboard.jpg';
import image1 from '@/assets/image/image1.png';
import image2 from '@/assets/image/image2.png';
import image3 from '@/assets/image/image3.png';
import image4 from '@/assets/image/image4.png';
import image5 from '@/assets/image/image5.png';

function Section_Index() {
    // Video Player Logic
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const playButtonRef = useRef(null);

    // Testimonials Slider Logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const trackRef = useRef(null);
    const sliderIntervalRef = useRef(null);
    const cardsRef = useRef([]);

    // Logo Animation Logic
    const logoRef = useRef(null);
    const [particles, setParticles] = useState([]);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [isLogoFlashing, setIsLogoFlashing] = useState(false);

    // About Section Animation
    const aboutSectionRef = useRef(null);
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    // Video Player Effects
    useEffect(() => {
        const video = videoRef.current;
        const playButton = playButtonRef.current;

        if (!video || !playButton) return;

        const handleMouseEnter = () => {
            if (!isPlaying) {
                playButton.style.opacity = '1';
            }
        };

        const handleMouseLeave = () => {
            if (!isPlaying) {
                playButton.style.opacity = '0';
            }
        };

        const handlePlayClick = () => {
            setIsPlaying(true);
            playButton.style.display = 'none';
            if (video.src.indexOf('autoplay') === -1) {
                video.src += "&autoplay=1";
            }
        };

        video.addEventListener('mouseenter', handleMouseEnter);
        video.addEventListener('mouseleave', handleMouseLeave);
        playButton.addEventListener('click', handlePlayClick);

        return () => {
            video.removeEventListener('mouseenter', handleMouseEnter);
            video.removeEventListener('mouseleave', handleMouseLeave);
            playButton.removeEventListener('click', handlePlayClick);
        };
    }, [isPlaying]);

    // Testimonials Slider Effects
    useEffect(() => {
        const track = trackRef.current;
        const cards = cardsRef.current;

        if (!track || !cards.length) return;

        const cardWidth = cards[0].offsetWidth + 32;
        const offset = -currentSlide * cardWidth;
        track.style.transform = `translateX(${offset}px)`;

        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }, [currentSlide]);

    useEffect(() => {
        // Auto slide
        const startAutoSlide = () => {
            sliderIntervalRef.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % cardsRef.current.length);
            }, 5000);
        };

        startAutoSlide();

        // Pause on hover
        const track = trackRef.current;
        if (!track) return;

        const handleMouseEnter = () => clearInterval(sliderIntervalRef.current);
        const handleMouseLeave = () => {
            sliderIntervalRef.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % cardsRef.current.length);
            }, 5000);
        };

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(sliderIntervalRef.current);
            track.removeEventListener('mouseenter', handleMouseEnter);
            track.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Logo Animation Effects
    useEffect(() => {
        // Create particles
        const newParticles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            size: Math.random() * 5 + 3,
            left: Math.random() * 100,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);

        // Random flash effect
        const flashInterval = setInterval(() => {
            setIsLogoFlashing(true);
            setTimeout(() => setIsLogoFlashing(false), 1000);
        }, Math.random() * 8000 + 5000);

        return () => clearInterval(flashInterval);
    }, []);

    // About Section Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAboutVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (aboutSectionRef.current) {
            observer.observe(aboutSectionRef.current);
        }

        return () => {
            if (aboutSectionRef.current) {
                observer.unobserve(aboutSectionRef.current);
            }
        };
    }, []);

    const goToSlide = (index) => {
        const totalSlides = cardsRef.current.length;
        if (index >= totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = totalSlides - 1;
        }
        setCurrentSlide(index);
    };

    const renderDots = () => {
        return cardsRef.current.map((_, index) => (
            <div
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
            />
        ));
    };

    // Gallery image data
    const galleryImages = [
        { 
            src: image1,
            alt: "Edificio moderno de conjunto residencial",
            caption: "Conjunto Residencial Las Acacias"
        },
        { 
            src: image2,
            alt: "Áreas comunes del conjunto residencial",
            caption: "Áreas Sociales Premium"
        },
        { 
            src: image3,
            alt: "Vista aérea del conjunto residencial",
            caption: "Vista Panorámica"
        },
        { 
            src: image4,
            alt: "Piscina y zona de recreación",
            caption: "Zona Recreativa"
        },
        { 
            src: image5,
            alt: "Jardines y áreas verdes",
            caption: "Jardines y Naturaleza"
        }
    ];

    // Testimonials data
    const testimonials = [
        {
            name: "Juan Martínez",
            role: "Administrador de PH",
            text: "Quorum360 ha transformado la gestión de nuestra copropiedad. Ahora todo es más transparente y eficiente.",
            image: "/src/assets/images/test1.png"
        },
        {
            name: "Laura González",
            role: "Contadora Pública",
            text: "Para la contabilidad de las copropiedades, Quorum360 es la herramienta ideal. Me encanta cómo simplifica la generación de estados financieros.",
            image: "/src/assets/images/test6.png"
        },
        {
            name: "Andres Perez",
            role: "Ingeniero de Sistemas",
            text: "Como ingeniero de sistemas, puedo decir que Quorum360 tiene una infraestructura sólida y bien diseñada. Es confiable, segura y fácil de integrar con otros sistemas.",
            image: "/src/assets/images/test3.png"
        },
        {
            name: "María Fernanda Ruiz",
            role: "Propietaria en Copropiedad",
            text: "Quorum360 me ha permitido estar más involucrada en la gestión de mi edificio. Antes era difícil estar al tanto de las reuniones y decisiones importantes.",
            image: "/src/assets/images/test4.png"
        },
        {
            name: "Carlos Gómez",
            role: "Abogado",
            text: "Desde el punto de vista legal, Quorum360 ha sido una herramienta invaluable. Facilita la gestión documental y permite un registro claro de las decisiones en las asambleas.",
            image: "/src/assets/images/test5.png"
        },
        {
            name: "Paula López",
            role: "Gerente de Proyectos Inmobiliarios",
            text: "Quorum360 ha sido clave en varios proyectos que gestiono. Nos permite coordinar mejor con las administraciones de las propiedades, y el manejo de la información es impecable.",
            image: "/src/assets/images/test2.png"
        }
        // ... otros testimonios
    ];


    return (
        <main>
            {/* Hero Section with Animated Logo */}
            <section className="hero">
                <div className="hero-logo">
                    <img 
                        src={logoPrincipal}
                        alt="Quorum360"
                        className={`hero-logo-img ${isLogoFlashing ? 'flash-effect' : ''}`}
                        id="animated-logo"
                        ref={logoRef}
                        style={{
                            transform: isLogoHovered ? 'scale(1.1) rotate(-5deg)' : '',
                            filter: isLogoHovered ? 'drop-shadow(0 10px 20px rgba(23, 190, 187, 0.3)) brightness(1.05)' : ''
                        }}
                        onMouseEnter={() => setIsLogoHovered(true)}
                        onMouseLeave={() => setIsLogoHovered(false)}
                    />
                    {/* Particles */}
                    {particles.map(particle => (
                        <div 
                            key={particle.id}
                            className="particle"
                            style={{
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                left: `${particle.left}vw`,
                                bottom: `-${particle.size}px`,
                                animationDuration: `${particle.duration}s`,
                                animationDelay: `${particle.delay}s`
                            }}
                        />
                    ))}
                </div>
            </section>

            <section className="gestion" aria-labelledby="hero-heading">
                <div className="container">
                    <div className="hero__content">
                        <h1 id="hero-heading" className="hero__title">Gestión Inteligente para Propiedad Horizontal</h1>
                        <p className="hero__text">Cumplimiento de la Ley 675 de 2001 y optimización de procesos administrativos para
                            copropiedades en Colombia</p>
                        <div className="hero__actions">
                            <a href="/demo" className="btn btn--primary btn--large">Solicitar Demo</a>
                            <a href="/precios" className="btn btn--outline btn--large">Ver Planes</a>
                        </div>
                    </div>
                </div>
                <div className="hero__image">
                    <img src={dashboard}
                        alt="Interfaz del software Quorum360 mostrando dashboard de administración" width="600" height="400"
                        loading="eager" />
                </div>
            </section>

            <section className="features" aria-labelledby="features-heading">
                <div className="container">
                    <h2 id="features-heading" className="section-title">Funcionalidades Clave</h2>
                    <div className="features-grid">
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <img src="/assets/icons/cobros.svg" alt="" aria-hidden="true" width="48" height="48" />
                            </div>
                            <h3 className="feature-card__title">Gestión de Cobros</h3>
                            <p className="feature-card__desc">Automatización de cobros recurrentes y generación de estados de cuenta.
                            </p>
                        </article>
            
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <img src="/assets/icons/asambleas.svg" alt="" aria-hidden="true" width="48" height="48" />
                            </div>
                            <h3 className="feature-card__title">Asambleas Virtuales</h3>
                            <p className="feature-card__desc">Realice asambleas con validez legal y participación remota.</p>
                        </article>
            
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <img src="/assets/icons/contabilidad.svg" alt="" aria-hidden="true" width="48" height="48" />
                            </div>
                            <h3 className="feature-card__title">Contabilidad Integrada</h3>
                            <p className="feature-card__desc">Reportes financieros automáticos y conciliación bancaria.</p>
                        </article>
            
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <img src="/assets/icons/documentos.svg" alt="" aria-hidden="true" width="48" height="48" />
                            </div>
                            <h3 className="feature-card__title">Gestión Documental</h3>
                            <p className="feature-card__desc">Archivo digital de actas, reglamentos y comunicaciones.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="gallery" aria-label="Galería de imágenes de nuestros proyectos">
                <div className="container">
                    <h2 className="section-title">Nuestros Espacios</h2>
                    <div className="gallery-container">
                        {[...Array(10)].map((_, i) => {
                            const imageIndex = i % galleryImages.length;
                            return (
                                <div key={i} className="gallery-slider">
                                    <div className="gallery-image">
                                        <img 
                                            src={galleryImages[imageIndex].src}
                                            alt={galleryImages[imageIndex].alt}
                                            loading="lazy"
                                        />
                                        <div className="image-overlay">
                                            <p>{galleryImages[imageIndex].caption}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section with Animation */}
            <section 
                className={`about-section ${isAboutVisible ? 'animate-in' : ''}`} 
                id="about-section"
                ref={aboutSectionRef}
            >
                <div className="container-about-section">
                    <div className="about-content">
                        <h2 className="section-title">Quiénes Somos</h2>
                        <div className="about-grid">
                            <div className="about-text">
                                <p className="highlight">Quorum360 es la solución tecnológica líder en gestión de copropiedades y
                                    propiedad horizontal.</p>
                                <p>Nuestra plataforma integrada ofrece herramientas innovadoras para administradores, residentes y
                                    proveedores, simplificando todos los procesos de gestión comunitaria.</p>
                                <ul className="features-list">
                                    {[
                                        "Automatización de procesos administrativos",
                                        "Comunicación centralizada",
                                        "Transparencia en la gestión",
                                        "Soporte técnico especializado"
                                    ].map((feature, index) => (
                                        <li key={index} style={{ transitionDelay: `${index * 0.1}s` }}>
                                            <i className="fas fa-check-circle"></i> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <a href="/src/pages/quienesomos.html" className="learn-more">Conoce más sobre nosotros</a>
                            </div>

                            <div className="video">
                                <div className="video-container">
                                    <iframe 
                                        width="560" 
                                        height="315" 
                                        src="https://www.youtube.com/embed/your-video-id?enablejsapi=1"
                                        title="Video de presentación de Quorum360" 
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                        id="quorum-video"
                                        ref={videoRef}
                                    />
                                    <div 
                                        className="play-button" 
                                        id="play-button"
                                        ref={playButtonRef}
                                        style={{ display: isPlaying ? 'none' : 'flex' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials" aria-labelledby="testimonials-heading">
                <div className="container">
                    <div className="section-header">
                        <h2 id="testimonials-heading" className="section-title">Lo que dicen nuestros clientes</h2>
                        <p className="section-subtitle">Conoce nuestros alcances</p>
                    </div>
            
                    <div className="testimonials-slider">
                        <div className="testimonials-track" ref={trackRef}>
                            {testimonials.map((testimonial, index) => (
                                <article 
                                    key={index} 
                                    className="testimonial-card" 
                                    itemScope 
                                    itemType="https://schema.org/Review"
                                    ref={el => cardsRef.current[index] = el}
                                >
                                    <div className="testimonial-content">
                                        <div className="testimonial-rating" aria-label="Calificación: 5 estrellas">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="star"></span>
                                            ))}
                                        </div>
                                        <p className="testimonial-text" itemProp="reviewBody">{testimonial.text}</p>
                                        <div className="testimonial-author">
                                            <img 
                                                src={testimonial.image} 
                                                alt={`Foto de ${testimonial.name}`} 
                                                className="author-photo"
                                                width="60" 
                                                height="60" 
                                                loading="lazy" 
                                                itemProp="image" 
                                            />
                                            <div className="author-info">
                                                <h3 className="author-name" itemProp="author">{testimonial.name}</h3>
                                                <p className="author-role" itemProp="description">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="testimonial-quote"></div>
                                </article>
                            ))}
                        </div>
            
                        <div className="slider-controls">
                            <button 
                                className="slider-prev" 
                                aria-label="Testimonio anterior"
                                onClick={() => goToSlide(currentSlide - 1)}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="slider-dots">
                                {renderDots()}
                            </div>
                            <button 
                                className="slider-next" 
                                aria-label="Siguiente testimonio"
                                onClick={() => goToSlide(currentSlide + 1)}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6L15 12L9 18" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Section_Index;