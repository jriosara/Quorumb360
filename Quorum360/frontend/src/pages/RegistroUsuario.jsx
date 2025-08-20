import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api'; // Importa el servicio
import '../styles/RegistroUsuario.css';
import logo from '../assets/image/Q360.png';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    pais: '',
    nombrePropiedad: '',
    tipo: '',
    numero: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Manejador para cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error específico cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones básicas
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'Nombre debe tener al menos 2 caracteres';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'Apellido es requerido';
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = 'Apellido debe tener al menos 2 caracteres';
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo) {
      newErrors.correo = 'Correo electrónico es requerido';
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Correo electrónico inválido';
    }

    // Validación de teléfono
    if (!formData.telefono) {
      newErrors.telefono = 'Teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono debe tener 10 dígitos';
    }

    // Validación de país
    if (!formData.pais) {
      newErrors.pais = 'País es requerido';
    }

    // Validación de propiedad
    if (!formData.nombrePropiedad.trim()) {
      newErrors.nombrePropiedad = 'Nombre de propiedad es requerido';
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Tipo de propiedad es requerido';
    }

    if (!formData.numero.trim()) {
      newErrors.numero = 'Número de propiedad es requerido';
    }

    // Validación de contraseña
    if (!formData.contrasena) {
      newErrors.contrasena = 'Contraseña es requerida';
    } else if (formData.contrasena.length < 8) {
      newErrors.contrasena = 'Contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.contrasena)) {
      newErrors.contrasena = 'Contraseña debe contener al menos una mayúscula, una minúscula y un número';
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Confirmación de contraseña es requerida';
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejador del submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Preparar datos para enviar (sin confirmarContrasena)
      const { confirmarContrasena, ...dataToSend } = formData;
      
      // Llamar al servicio de registro
      const response = await userService.register(dataToSend);
      
      // Mostrar mensaje de éxito
      alert('¡Usuario registrado exitosamente!');
      
      // Redirigir al login
      navigate('/login', { 
        state: { 
          registrationSuccess: true,
          message: 'Registro exitoso. Por favor, inicie sesión.'
        }
      });

    } catch (error) {
      console.error('Error en el registro:', error);
      
      // Manejar diferentes tipos de errores
      if (error.message) {
        alert(error.message);
      } else if (error.errors) {
        // Si el backend devuelve errores específicos por campo
        setErrors(error.errors);
      } else {
        alert('Error en el registro. Por favor, intente nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registro-pagina">
      <div className="registro-contenido-flex">
        {/* Sección Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <img src={logo} alt="Quorum360" className="hero-logo" />
            <h1>Únete a Quorum360</h1>
            <p>La solución integral para la gestión eficiente de propiedades horizontales</p>
          </div>
        </section>

        {/* Formulario de Registro */}
        <div className="registration-section">
          <div className="registration-container">
            <div className="registration-header">
              <h2>Registro de Usuario</h2>
              <p>Por favor, complete los campos para registrarse</p>
            </div>

            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.nombre ? 'error' : ''}`}
                    id="nombre" 
                    name="nombre"
                    value={formData.nombre} 
                    onChange={handleInputChange} 
                    required 
                  />
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido:</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.apellido ? 'error' : ''}`}
                    id="apellido" 
                    name="apellido"
                    value={formData.apellido} 
                    onChange={handleInputChange} 
                    required 
                  />
                  {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="correo">Correo Electrónico:</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.correo ? 'error' : ''}`}
                  id="correo" 
                  name="correo"
                  value={formData.correo} 
                  onChange={handleInputChange} 
                  required 
                />
                {errors.correo && <span className="error-message">{errors.correo}</span>}
              </div>

              <div className="form-group phone-input-container">
                <div className="country-code-selector">
                  <select 
                    className={`form-control ${errors.pais ? 'error' : ''}`}
                    name="pais"
                    value={formData.pais} 
                    onChange={handleInputChange} 
                    required
                  >
                    <option value="">País</option>
                    <option value="colombia">Colombia</option>
                    <option value="mexico">México</option>
                    <option value="argentina">Argentina</option>
                    <option value="chile">Chile</option>
                    <option value="peru">Perú</option>
                  </select>
                  {errors.pais && <span className="error-message">{errors.pais}</span>}
                </div>
                <div className="phone-input-wrapper">
                  <input 
                    type="tel" 
                    className={`form-control ${errors.telefono ? 'error' : ''}`}
                    id="telefono" 
                    name="telefono"
                    value={formData.telefono} 
                    onChange={handleInputChange} 
                    pattern="[0-9]{10}" 
                    placeholder="Teléfono" 
                    required 
                  />
                  {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='nombrePropiedad'>Nombre de la propiedad:</label>
                <input 
                  type='text' 
                  className={`form-control ${errors.nombrePropiedad ? 'error' : ''}`}
                  id='nombrePropiedad' 
                  name='nombrePropiedad'
                  value={formData.nombrePropiedad} 
                  onChange={handleInputChange} 
                  required 
                />
                {errors.nombrePropiedad && <span className="error-message">{errors.nombrePropiedad}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tipo">Tipo de propiedad:</label>
                <select 
                  className={`form-control ${errors.tipo ? 'error' : ''}`}
                  id="tipo" 
                  name="tipo"
                  value={formData.tipo} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa">Casa</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.tipo && <span className="error-message">{errors.tipo}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="numero">Número de propiedad:</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.numero ? 'error' : ''}`}
                  id="numero" 
                  name="numero"
                  value={formData.numero} 
                  onChange={handleInputChange} 
                  required 
                />
                {errors.numero && <span className="error-message">{errors.numero}</span>}
              </div>

              <div className="form-group password-container">
                <label htmlFor="contrasena">Contraseña:</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className={`form-control ${errors.contrasena ? 'error' : ''}`}
                    id="contrasena" 
                    name="contrasena"
                    value={formData.contrasena} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.contrasena && <span className="error-message">{errors.contrasena}</span>}
              </div>

              <div className="form-group password-container">
                <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    className={`form-control ${errors.confirmarContrasena ? 'error' : ''}`}
                    id="confirmarContrasena" 
                    name="confirmarContrasena"
                    value={formData.confirmarContrasena} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmarContrasena && <span className="error-message">{errors.confirmarContrasena}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;