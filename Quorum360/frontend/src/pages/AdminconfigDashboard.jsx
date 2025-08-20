import React, { useState, useEffect } from 'react';
import '@/styles/Admindashboard.css'; // Asegúrate de tener este archivo CSS para estilos

const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('usuarios');
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        rol: '',
        password: '',
        confirmPassword: '',
        propiedadId: ''
    });
    
    const [propertyForm, setPropertyForm] = useState({
        id: '',
        nombre: '',
        tipo: '',
        unidades: '',
        direccion: '',
        ciudad: '',
        descripcion: ''
    });

    // Simulación de datos iniciales
    useEffect(() => {
        // Datos de ejemplo - en una aplicación real estos vendrían de una API
        const mockUsers = [
        { id: 1, nombre: 'Admin', apellido: 'Principal', email: 'admin@conjunto.com', rol: 'admin', propiedadId: 1 },
        { id: 2, nombre: 'Juan', apellido: 'Pérez', email: 'juan@conjunto.com', rol: 'residente', propiedadId: 1 },
        { id: 3, nombre: 'María', apellido: 'Gómez', email: 'maria@conjunto.com', rol: 'residente', propiedadId: 2 }
        ];
        
        const mockProperties = [
        { id: 1, nombre: 'Conjunto Las Palmas', tipo: 'ph', unidades: 120, direccion: 'Calle 123 #45-67', ciudad: 'Bogotá', descripcion: 'Conjunto residencial con zonas verdes' },
        { id: 2, nombre: 'Edificio Torre Alta', tipo: 'edificio', unidades: 80, direccion: 'Carrera 7 #22-10', ciudad: 'Medellín', descripcion: 'Edificio de apartamentos con gimnasio' }
        ];
        
        setUsers(mockUsers);
        setProperties(mockProperties);
        setCurrentUser({ nombre: 'Admin', apellido: 'Principal' });
    }, []);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setIsEditing(false);
        resetForm();
    };

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handlePropertyInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyForm({
        ...propertyForm,
        [name]: value
        });
    };

    const resetForm = () => {
        setFormData({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        rol: '',
        password: '',
        confirmPassword: '',
        propiedadId: ''
        });
    };

    const handleEditUser = (user) => {
        setFormData({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        password: '',
        confirmPassword: '',
        propiedadId: user.propiedadId
        });
        setIsEditing(true);
        setActiveSection('usuarios');
    };

    const handleEditProperty = (property) => {
        setPropertyForm({
        id: property.id,
        nombre: property.nombre,
        tipo: property.tipo,
        unidades: property.unidades,
        direccion: property.direccion,
        ciudad: property.ciudad,
        descripcion: property.descripcion
        });
        setActiveSection('conjuntos');
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        
        // Validación básica
        if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
        }
        
        if (isEditing) {
        // Lógica para actualizar usuario
        setUsers(users.map(user => 
            user.id === formData.id ? { ...user, ...formData } : user
        ));
        } else {
        // Lógica para crear nuevo usuario
        const newUser = {
            id: users.length + 1,
            ...formData
        };
        setUsers([...users, newUser]);
        }
        
        resetForm();
        setIsEditing(false);
    };

    const handlePropertySubmit = (e) => {
        e.preventDefault();
        
        if (propertyForm.id) {
        // Actualizar conjunto existente
        setProperties(properties.map(prop => 
            prop.id === propertyForm.id ? { ...prop, ...propertyForm } : prop
        ));
        } else {
        // Crear nuevo conjunto
        const newProperty = {
            id: properties.length + 1,
            ...propertyForm
        };
        setProperties([...properties, newProperty]);
        }
        
        setPropertyForm({
        id: '',
        nombre: '',
        tipo: '',
        unidades: '',
        direccion: '',
        ciudad: '',
        descripcion: ''
        });
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
        setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleDeleteProperty = (propertyId) => {
        if (window.confirm('¿Estás seguro de eliminar este conjunto residencial?')) {
        setProperties(properties.filter(prop => prop.id !== propertyId));
        }
    };

    return (
        <div className="admin-container">
        <aside className="admin-sidebar">
            <div className="admin-logo">
            <img src="/src/assets/image/Q360.png" alt="Quorum360" />
            </div>
            <nav className="admin-menu">
            <ul>
                <li className={activeSection === 'perfil' ? 'active' : ''}>
                <button onClick={() => handleSectionChange('perfil')}>
                    <i className="fas fa-user-cog"></i> Perfil
                </button>
                </li>
                <li className={activeSection === 'conjuntos' ? 'active' : ''}>
                <button onClick={() => handleSectionChange('conjuntos')}>
                    <i className="fas fa-building"></i> Conjuntos
                </button>
                </li>
                <li className={activeSection === 'usuarios' ? 'active' : ''}>
                <button onClick={() => handleSectionChange('usuarios')}>
                    <i className="fas fa-users"></i> Usuarios
                </button>
                </li>
                <li className={activeSection === 'seguridad' ? 'active' : ''}>
                <button onClick={() => handleSectionChange('seguridad')}>
                    <i className="fas fa-shield-alt"></i> Seguridad
                </button>
                </li>
            </ul>
            </nav>
        </aside>

        <main className="admin-content">
            <div className="admin-header">
            <h1><i className="fas fa-cogs"></i> Panel de Administración</h1>
            <div className="user-info">
                <span>Bienvenido, <strong>{currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Administrador'}</strong></span>
                <div className="user-avatar">
                <i className="fas fa-user"></i>
                </div>
            </div>
            </div>

            {/* Sección de Perfil */}
            <section id="perfil" className={`admin-section ${activeSection === 'perfil' ? 'active' : ''}`}>
            <h2><i className="fas fa-user-edit"></i> Configuración de Perfil</h2>
            <form className="admin-form">
                <div className="form-grid">
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" value={currentUser?.nombre || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input type="text" value={currentUser?.apellido || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" value="admin@conjunto.com" readOnly />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input type="tel" placeholder="Actualiza tu teléfono" />
                </div>
                </div>
                <button type="submit" className="btn-save"><i className="fas fa-save"></i> Guardar Cambios</button>
            </form>
            </section>

            {/* Sección de Conjuntos Residenciales */}
            <section id="conjuntos" className={`admin-section ${activeSection === 'conjuntos' ? 'active' : ''}`}>
            <h2><i className="fas fa-building"></i> Gestión de Conjuntos Residenciales</h2>
            
            <div className="management-container">
                <div className="list-container">
                <div className="list-header">
                    <h3>Conjuntos Registrados</h3>
                    <button 
                    className="btn-add" 
                    onClick={() => {
                        setPropertyForm({
                        id: '',
                        nombre: '',
                        tipo: '',
                        unidades: '',
                        direccion: '',
                        ciudad: '',
                        descripcion: ''
                        });
                        setActiveSection('conjuntos');
                    }}
                    >
                    <i className="fas fa-plus"></i> Agregar Conjunto
                    </button>
                </div>
                
                <div className="properties-list">
                    {properties.map(property => (
                    <div key={property.id} className="property-item">
                        <div className="property-info">
                        <h4>{property.nombre}</h4>
                        <p>{property.direccion}, {property.ciudad}</p>
                        <span className="property-type">{property.tipo === 'ph' ? 'Propiedad Horizontal' : 'Edificio'}</span>
                        </div>
                        <div className="property-actions">
                        <button 
                            className="btn-edit" 
                            onClick={() => handleEditProperty(property)}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button 
                            className="btn-delete" 
                            onClick={() => handleDeleteProperty(property.id)}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                
                <div className="form-container">
                <form id="property-form" className="admin-form" onSubmit={handlePropertySubmit}>
                    <h3>{propertyForm.id ? 'Editar Conjunto' : 'Nuevo Conjunto'}</h3>
                    
                    <div className="form-group">
                    <label htmlFor="nombre">Nombre del Conjunto</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={propertyForm.nombre}
                        onChange={handlePropertyInputChange}
                        required 
                    />
                    </div>
                    
                    <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="tipo">Tipo de Propiedad</label>
                        <select 
                        id="tipo" 
                        name="tipo" 
                        value={propertyForm.tipo}
                        onChange={handlePropertyInputChange}
                        required
                        >
                        <option value="">Seleccionar...</option>
                        <option value="ph">Propiedad Horizontal</option>
                        <option value="edificio">Edificio</option>
                        <option value="condominio">Condominio</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="unidades">Número de Unidades</label>
                        <input 
                        type="number" 
                        id="unidades" 
                        name="unidades" 
                        value={propertyForm.unidades}
                        onChange={handlePropertyInputChange}
                        min="1" 
                        />
                    </div>
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input 
                        type="text" 
                        id="direccion" 
                        name="direccion" 
                        value={propertyForm.direccion}
                        onChange={handlePropertyInputChange}
                        required 
                    />
                    </div>
                    
                    <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="ciudad">Ciudad</label>
                        <input 
                        type="text" 
                        id="ciudad" 
                        name="ciudad" 
                        value={propertyForm.ciudad}
                        onChange={handlePropertyInputChange}
                        required 
                        />
                    </div>
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="descripcion">Descripción (Opcional)</label>
                    <textarea 
                        id="descripcion" 
                        name="descripcion" 
                        rows="3"
                        value={propertyForm.descripcion}
                        onChange={handlePropertyInputChange}
                    ></textarea>
                    </div>
                    
                    <div className="form-actions">
                    <button type="submit" className="btn-save">
                        <i className="fas fa-save"></i> {propertyForm.id ? 'Actualizar' : 'Guardar'}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </section>

            {/* Sección de Usuarios */}
            <section id="usuarios" className={`admin-section ${activeSection === 'usuarios' ? 'active' : ''}`}>
            <h2><i className="fas fa-users"></i> Gestión de Usuarios</h2>
            
            <div className="management-container">
                <div className="list-container">
                <div className="list-header">
                    <h3>Usuarios Registrados</h3>
                    <button 
                    className="btn-add" 
                    onClick={() => {
                        resetForm();
                        setIsEditing(false);
                        setActiveSection('usuarios');
                    }}
                    >
                    <i className="fas fa-plus"></i> Agregar Usuario
                    </button>
                </div>
                
                <div className="users-list">
                    {users.map(user => (
                    <div key={user.id} className="user-item">
                        <div className="user-info">
                        <h4>{user.nombre} {user.apellido}</h4>
                        <p>{user.email}</p>
                        <span className={`user-role ${user.rol}`}>
                            {user.rol === 'admin' ? 'Administrador' : 
                            user.rol === 'residente' ? 'Residente' : 'Otro'}
                        </span>
                        </div>
                        <div className="user-actions">
                        <button 
                            className="btn-edit" 
                            onClick={() => handleEditUser(user)}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button 
                            className="btn-delete" 
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                
                <div className="form-container">
                <form id="user-form" className="admin-form" onSubmit={handleUserSubmit}>
                    <h3>{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                    
                    <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="user-nombre">Nombre</label>
                        <input 
                        type="text" 
                        id="user-nombre" 
                        name="nombre" 
                        value={formData.nombre}
                        onChange={handleUserInputChange}
                        required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-apellido">Apellido</label>
                        <input 
                        type="text" 
                        id="user-apellido" 
                        name="apellido" 
                        value={formData.apellido}
                        onChange={handleUserInputChange}
                        required 
                        />
                    </div>
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="user-email">Correo Electrónico</label>
                    <input 
                        type="email" 
                        id="user-email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleUserInputChange}
                        required 
                    />
                    </div>
                    
                    <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="user-rol">Rol</label>
                        <select 
                        id="user-rol" 
                        name="rol" 
                        value={formData.rol}
                        onChange={handleUserInputChange}
                        required
                        >
                        <option value="">Seleccionar...</option>
                        <option value="admin">Administrador</option>
                        <option value="residente">Residente</option>
                        <option value="proveedor">Proveedor</option>
                        <option value="vigilancia">Vigilancia</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-propiedad">Conjunto Residencial</label>
                        <select 
                        id="user-propiedad" 
                        name="propiedadId" 
                        value={formData.propiedadId}
                        onChange={handleUserInputChange}
                        required
                        >
                        <option value="">Seleccionar...</option>
                        {properties.map(property => (
                            <option key={property.id} value={property.id}>{property.nombre}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                    
                    <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="user-password">
                        {isEditing ? 'Nueva Contraseña' : 'Contraseña'}
                        </label>
                        <input 
                        type="password" 
                        id="user-password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleUserInputChange}
                        required={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-confirm-password">
                        {isEditing ? 'Confirmar Nueva Contraseña' : 'Confirmar Contraseña'}
                        </label>
                        <input 
                        type="password" 
                        id="user-confirm-password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleUserInputChange}
                        required={!isEditing}
                        />
                    </div>
                    </div>
                    
                    <div className="form-actions">
                    <button 
                        type="button" 
                        className="btn-cancel"
                        onClick={() => {
                        resetForm();
                        setIsEditing(false);
                        }}
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="btn-save">
                        <i className="fas fa-save"></i> {isEditing ? 'Actualizar' : 'Guardar'}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </section>

            {/* Sección de Seguridad */}
            <section id="seguridad" className={`admin-section ${activeSection === 'seguridad' ? 'active' : ''}`}>
            <h2><i className="fas fa-shield-alt"></i> Configuración de Seguridad</h2>
            <form className="admin-form">
                <div className="form-group">
                <label htmlFor="current-password">Contraseña Actual</label>
                <input type="password" id="current-password" required />
                </div>
                
                <div className="form-group">
                <label htmlFor="new-password">Nueva Contraseña</label>
                <input type="password" id="new-password" required />
                </div>
                
                <div className="form-group">
                <label htmlFor="confirm-password">Confirmar Nueva Contraseña</label>
                <input type="password" id="confirm-password" required />
                </div>
                
                <div className="security-options">
                <h3>Opciones de Seguridad</h3>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="two-factor" />
                    <label htmlFor="two-factor">Autenticación de dos factores (2FA)</label>
                </div>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="session-timeout" defaultChecked />
                    <label htmlFor="session-timeout">
                    Cierre de sesión automático después de 30 minutos de inactividad
                    </label>
                </div>
                </div>
                
                <button type="submit" className="btn-save">
                <i className="fas fa-save"></i> Actualizar Configuración
                </button>
            </form>
            </section>
        </main>
        </div>
    );
    };

export default AdminPanel;