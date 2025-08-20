import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt, faCalculator, faFileInvoiceDollar, faChartLine,
    faBuilding, faComments, faCog, faSignOutAlt, faSearch,
    faBell, faPlus, faDollarSign, faCheckCircle, faExclamationCircle,
    faUsers, faFileInvoice, faEnvelope, faChartPie, faCalendarPlus,
    faBullhorn, faEye, faDownload, faShareAlt, faFolderOpen
} from '@fortawesome/free-solid-svg-icons';
import '@/styles/GestionAdmin.css'; // Asegúrate de tener un archivo CSS para estilos
import Reuniones from './Reuniones';

const ResidentialAdminPanel = () => {
    // Estado para el módulo activo
    const [activeModule, setActiveModule] = useState('dashboard');
    // Estado para el conjunto residencial seleccionado
    const [selectedResidential, setSelectedResidential] = useState(null);
    // Estado para la lista de conjuntos residenciales
    const [residentials, setResidentials] = useState([]);
    // Estado para la búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para notificaciones
    const [notifications, setNotifications] = useState([]);

    // Datos de ejemplo para estadísticas
    const [stats, setStats] = useState({
        monthlyIncome: 12450000,
        paymentsMade: '87%',
        pendingPQR: 12,
        activeOwners: '64/72'
    });

    // Simular carga de conjuntos residenciales
    useEffect(() => {
        // En una aplicación real, esto vendría de una API
        const mockResidentials = [
            { id: 1, name: 'Torres del Parque', address: 'Calle 123 #45-67', units: 72 },
            { id: 2, name: 'Bosques de Castilla', address: 'Carrera 89 #12-34', units: 48 },
            { id: 3, name: 'Altos de Santa Bárbara', address: 'Avenida 5 #67-89', units: 36 }
        ];

        setResidentials(mockResidentials);
        setSelectedResidential(mockResidentials[0]);

        // Notificaciones de ejemplo
        setNotifications([
            { id: 1, message: 'Nueva PQR recibida', time: 'Hace 2 horas', read: false },
            { id: 2, message: 'Pago registrado para Apt 302', time: 'Hace 5 horas', read: false },
            { id: 3, message: 'Reunión programada para mañana', time: 'Ayer', read: false }
        ]);
    }, []);

    // Manejar cambio de módulo
    const handleModuleChange = (module) => {
        setActiveModule(module);
    };

    // Manejar cambio de conjunto residencial
    const handleResidentialChange = (residential) => {
        setSelectedResidential(residential);
        // Aquí podrías cargar los datos específicos del conjunto seleccionado
    };

    // Renderizar módulo activo
    const renderActiveModule = () => {
        switch (activeModule) {
            case 'dashboard':
                return <DashboardModule stats={stats} residential={selectedResidential} />;
            case 'contabilidad':
                return <AccountingModule residential={selectedResidential} />;
            case 'facturacion':
                return <BillingModule residential={selectedResidential} />;
            case 'finanzas':
                return <FinanceModule residential={selectedResidential} />;
            case 'reuniones':
            return <ManagementModule residential={selectedResidential} />;
            case 'pqr':
                return <PQRModule residential={selectedResidential} />;
            case 'configuracion':
                return <SettingsModule residential={selectedResidential} />;
            default:
                return <DashboardModule stats={stats} residential={selectedResidential} />;
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="/assets/images/logo-admin.svg" alt="Quorum360" className="sidebar-logo" />
                    <h2>Panel de Administración</h2>
                </div>

                {/* Selector de conjunto residencial */}
                <div className="residential-selector">
                    <label>Conjunto Residencial:</label>
                    <select
                        value={selectedResidential?.id || ''}
                        onChange={(e) => {
                            const selected = residentials.find(r => r.id === parseInt(e.target.value));
                            if (selected) handleResidentialChange(selected);
                        }}
                    >
                        {residentials.map(residential => (
                            <option key={residential.id} value={residential.id}>
                                {residential.name}
                            </option>
                        ))}
                    </select>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        <li className={activeModule === 'dashboard' ? 'active' : ''}>
                            <a href="#dashboard" onClick={() => handleModuleChange('dashboard')}>
                                <FontAwesomeIcon icon={faTachometerAlt} />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className={activeModule === 'contabilidad' ? 'active' : ''}>
                            <a href="#contabilidad" onClick={() => handleModuleChange('contabilidad')}>
                                <FontAwesomeIcon icon={faCalculator} />
                                <span>Contabilidad</span>
                            </a>
                        </li>
                        <li className={activeModule === 'facturacion' ? 'active' : ''}>
                            <a href="#facturacion" onClick={() => handleModuleChange('facturacion')}>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                                <span>Facturación</span>
                            </a>
                        </li>
                        <li className={activeModule === 'finanzas' ? 'active' : ''}>
                            <a href="#finanzas" onClick={() => handleModuleChange('finanzas')}>
                                <FontAwesomeIcon icon={faChartLine} />
                                <span>Finanzas Copropiedad</span>
                            </a>
                        </li>
                        <li className={activeModule === 'reuniones' ? 'active' : ''}>
                            <a href="#reuniones" onClick={() => handleModuleChange('reuniones')}>
                                <FontAwesomeIcon icon={faBuilding} />
                                <span>Reuniones</span>
                            </a>
                        </li>
                        <li className={activeModule === 'pqr' ? 'active' : ''}>
                            <a href="#pqr" onClick={() => handleModuleChange('pqr')}>
                                <FontAwesomeIcon icon={faComments} />
                                <span>PQR</span>
                            </a>
                        </li>
                        <li className={activeModule === 'configuracion' ? 'active' : ''}>
                            <a href="#configuracion" onClick={() => handleModuleChange('configuracion')}>
                                <FontAwesomeIcon icon={faCog} />
                                <span>Configuración</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <img src="/assets/images/user-avatar.jpg" alt="Usuario" className="user-avatar" />
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">Administrador</span>
                        </div>
                    </div>
                    <a href="/" className="logout-btn">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Cerrar sesión</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Gestión {selectedResidential?.name || 'Conjunto Residencial'}</h1>
                    <div className="header-actions">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <button className="notification-btn">
                            <FontAwesomeIcon icon={faBell} />
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
                            )}
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    {selectedResidential ? (
                        renderActiveModule()
                    ) : (
                        <div className="loading-state">
                            <p>Cargando información del conjunto residencial...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Componentes para cada módulo
const DashboardModule = ({ stats, residential }) => {
    return (
        <section id="dashboard" className="module active">
            <div className="module-header">
                <h2>Resumen General - {residential?.name}</h2>
                <div className="module-actions">
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} /> Generar Reporte
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-blue">
                        <FontAwesomeIcon icon={faDollarSign} />
                    </div>
                    <div className="stat-info">
                        <h3>Ingresos Mensuales</h3>
                        <p>${stats.monthlyIncome?.toLocaleString() || '0'}</p>
                        <span className="stat-change positive">+5% vs mes anterior</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-green">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="stat-info">
                        <h3>Pagos Realizados</h3>
                        <p>{stats.paymentsMade || '0%'}</p>
                        <span className="stat-change positive">+3% vs mes anterior</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-orange">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                    <div className="stat-info">
                        <h3>PQR Pendientes</h3>
                        <p>{stats.pendingPQR || '0'}</p>
                        <span className="stat-change negative">+2 vs mes anterior</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-purple">
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className="stat-info">
                        <h3>Propietarios Activos</h3>
                        <p>{stats.activeOwners || '0/0'}</p>
                        <span className="stat-change neutral">Sin cambios</span>
                    </div>
                </div>
            </div>

            <div className="module-grid">
                <div className="module-card wide">
                    <h3>Actividades Recientes</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                            </div>
                            <div className="activity-content">
                                <p>Nueva factura generada para Apartamento 302</p>
                                <span className="activity-time">Hace 2 horas</span>
                            </div>
                        </div>
                        {/* Más actividades... */}
                    </div>
                </div>

                <div className="module-card">
                    <h3>Próximas Reuniones</h3>
                    <div className="meeting-list">
                        <div className="meeting-item">
                            <div className="meeting-date">
                                <span className="day">15</span>
                                <span className="month">Jun</span>
                            </div>
                            <div className="meeting-info">
                                <p>Asamblea General Ordinaria</p>
                                <span className="meeting-time">3:00 PM - Salón Comunal</span>
                            </div>
                        </div>
                        {/* Más reuniones... */}
                    </div>
                </div>
            </div>
        </section>
    );
};

const AccountingModule = ({ residential }) => {
    const [activeTab, setActiveTab] = useState('cuentas-cobrar');
    const [showModal, setShowModal] = useState(false);

    return (
        <section id="contabilidad" className="module">
            <div className="module-header">
                <h2>Gestión Contable - {residential?.name}</h2>
                <div className="module-actions">
                    <div className="dropdown">
                        <button className="btn btn-outline dropdown-toggle">
                            <FontAwesomeIcon icon={faDownload} /> Exportar
                        </button>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item">Excel</a>
                            <a href="#" className="dropdown-item">PDF</a>
                            <a href="#" className="dropdown-item">CSV</a>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Nuevo Registro
                    </button>
                </div>
            </div>

            <div className="accounting-tabs">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'cuentas-cobrar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cuentas-cobrar')}
                    >
                        Cuentas por Cobrar
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'cuentas-pagar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cuentas-pagar')}
                    >
                        Cuentas por Pagar
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'balance-general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('balance-general')}
                    >
                        Balance General
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'conciliacion' ? 'active' : ''}`}
                        onClick={() => setActiveTab('conciliacion')}
                    >
                        Conciliación Bancaria
                    </button>
                </div>

                <div className="tabs-content">
                    <div className={`tab-pane ${activeTab === 'cuentas-cobrar' ? 'active' : ''}`}>
                        {/* Contenido de cuentas por cobrar */}
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Propiedad</th>
                                        <th>Concepto</th>
                                        <th>Fecha</th>
                                        <th>Valor</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Datos dinámicos */}
                                    <tr>
                                        <td>Apartamento 302</td>
                                        <td>Administración Enero 2023</td>
                                        <td>05/01/2023</td>
                                        <td>$450,000</td>
                                        <td><span className="badge paid">Pagado</span></td>
                                        <td>
                                            <button className="action-btn">Ver</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Otras pestañas... */}
                </div>
            </div>

            {/* Modal para nuevo registro */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Nuevo Registro Contable</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Tipo de Registro</label>
                                    <select required>
                                        <option value="income">Ingreso</option>
                                        <option value="expense">Gasto</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Propiedad</label>
                                    <select required>
                                        <option value="">Seleccione una propiedad</option>
                                        {/* Opciones dinámicas */}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Concepto</label>
                                    <input type="text" required />
                                </div>
                                <div className="form-group">
                                    <label>Valor</label>
                                    <input type="number" min="0" step="0.01" required />
                                </div>
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input type="date" required />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea></textarea>
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

const BillingModule = ({ residential }) => {
    const [period, setPeriod] = useState('current');
    const [showCustomDates, setShowCustomDates] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);

    return (
        <section id="facturacion" className="module">
            <div className="module-header">
                <h2>Gestión de Facturación - {residential?.name}</h2>
                <div className="module-actions">
                    <button className="btn btn-primary" onClick={() => setShowGenerateModal(true)}>
                        <FontAwesomeIcon icon={faFileInvoice} /> Generar Facturas
                    </button>
                    <button className="btn btn-outline">
                        <FontAwesomeIcon icon={faEnvelope} /> Enviar Recordatorios
                    </button>
                </div>
            </div>

            <div className="billing-controls">
                <div className="period-selector">
                    <select
                        value={period}
                        onChange={(e) => {
                            setPeriod(e.target.value);
                            setShowCustomDates(e.target.value === 'custom');
                        }}
                    >
                        <option value="current">Período Actual</option>
                        <option value="last">Período Anterior</option>
                        <option value="custom">Personalizado</option>
                    </select>
                    {showCustomDates && (
                        <div className="custom-dates">
                            <input type="date" />
                            <span>a</span>
                            <input type="date" />
                            <button className="btn btn-sm">Aplicar</button>
                        </div>
                    )}
                </div>
                <div className="billing-filters">
                    <select>
                        <option value="all">Todas</option>
                        <option value="paid">Pagadas</option>
                        <option value="pending">Pendientes</option>
                        <option value="overdue">Vencidas</option>
                        <option value="cancelled">Anuladas</option>
                    </select>
                </div>
            </div>

            <div className="invoices-summary">
                <div className="summary-card">
                    <div className="summary-icon bg-blue">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} />
                    </div>
                    <div className="summary-info">
                        <h3>Facturas Generadas</h3>
                        <p>72</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon bg-green">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="summary-info">
                        <h3>Pagadas</h3>
                        <p>63</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon bg-orange">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                    <div className="summary-info">
                        <h3>Pendientes</h3>
                        <p>9</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon bg-red">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                    <div className="summary-info">
                        <h3>Vencidas</h3>
                        <p>2</p>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>N° Factura</th>
                            <th>Propiedad</th>
                            <th>Período</th>
                            <th>Fecha Emisión</th>
                            <th>Vencimiento</th>
                            <th>Valor</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Datos dinámicos */}
                        <tr>
                            <td>FAC-2023-001</td>
                            <td>Apartamento 302</td>
                            <td>Enero 2023</td>
                            <td>01/01/2023</td>
                            <td>15/01/2023</td>
                            <td>$450,000</td>
                            <td><span className="badge paid">Pagada</span></td>
                            <td>
                                <button className="action-btn">Ver</button>
                                <button className="action-btn">PDF</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Modal para generar facturas */}
            {showGenerateModal && (
                <div className="modal">
                    <div className="modal-content large">
                        <div className="modal-header">
                            <h3>Generar Facturas</h3>
                            <button className="modal-close" onClick={() => setShowGenerateModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="generation-options">
                                <div className="form-group">
                                    <label>Período a Facturar</label>
                                    <select>
                                        <option value="current">Mes Actual</option>
                                        <option value="next">Próximo Mes</option>
                                        <option value="custom">Período Específico</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Fecha de Emisión</label>
                                    <input type="date" />
                                </div>
                                <div className="form-group">
                                    <label>Días para Vencimiento</label>
                                    <input type="number" defaultValue="15" min="1" />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input type="checkbox" defaultChecked />
                                        Incluir saldos anteriores
                                    </label>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input type="checkbox" defaultChecked />
                                        Enviar notificaciones por email
                                    </label>
                                </div>
                            </div>

                            <div className="preview-section">
                                <h4>Resumen de Facturación</h4>
                                <div className="preview-summary">
                                    <div className="preview-item">
                                        <span>Propiedades a facturar:</span>
                                        <span>72</span>
                                    </div>
                                    <div className="preview-item">
                                        <span>Total a facturar:</span>
                                        <span>$32,400,000</span>
                                    </div>
                                    <div className="preview-item">
                                        <span>Administración:</span>
                                        <span>$30,240,000</span>
                                    </div>
                                    <div className="preview-item">
                                        <span>Otros conceptos:</span>
                                        <span>$2,160,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" onClick={() => setShowGenerateModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary">Generar Facturas</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

const FinanceModule = ({ residential }) => {
    const [period, setPeriod] = useState('month');
    const [showCustomDates, setShowCustomDates] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false);

    return (
        <section id="finanzas" className="module">
            <div className="module-header">
                <h2>Finanzas de la Copropiedad - {residential?.name}</h2>
                <div className="module-actions">
                    <div className="dropdown">
                        <button className="btn btn-outline dropdown-toggle">
                            <FontAwesomeIcon icon={faChartPie} /> Generar Reporte
                        </button>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item">Estado Mensual</a>
                            <a href="#" className="dropdown-item">Estado Anual</a>
                            <a href="#" className="dropdown-item">Flujo de Caja</a>
                            <a href="#" className="dropdown-item">Presupuesto vs Real</a>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowCompareModal(true)}>
                        <FontAwesomeIcon icon={faChartLine} /> Comparar Períodos
                    </button>
                </div>
            </div>

            <div className="finance-period-selector">
                <div className="period-tabs">
                    <button
                        className={`period-tab ${period === 'month' ? 'active' : ''}`}
                        onClick={() => setPeriod('month')}
                    >
                        Mes Actual
                    </button>
                    <button
                        className={`period-tab ${period === 'quarter' ? 'active' : ''}`}
                        onClick={() => setPeriod('quarter')}
                    >
                        Trimestre
                    </button>
                    <button
                        className={`period-tab ${period === 'year' ? 'active' : ''}`}
                        onClick={() => setPeriod('year')}
                    >
                        Año
                    </button>
                    <button
                        className={`period-tab ${period === 'custom' ? 'active' : ''}`}
                        onClick={() => {
                            setPeriod('custom');
                            setShowCustomDates(true);
                        }}
                    >
                        Personalizado
                    </button>
                </div>
                {showCustomDates && (
                    <div className="period-dates">
                        <input type="date" />
                        <span>a</span>
                        <input type="date" />
                        <button className="btn btn-sm">Aplicar</button>
                    </div>
                )}
            </div>

            <div className="finance-dashboard">
                <div className="finance-chart-container">
                    <div className="chart-header">
                        <h3>Ingresos vs Gastos</h3>
                        <div className="chart-legend">
                            <span className="legend-item income"><i className="fas fa-square"></i> Ingresos</span>
                            <span className="legend-item expense"><i className="fas fa-square"></i> Gastos</span>
                        </div>
                    </div>
                    <div className="chart-placeholder">
                        {/* Aquí iría el gráfico con Chart.js o similar */}
                        <p>Gráfico de ingresos vs gastos</p>
                    </div>
                </div>

                <div className="finance-kpis">
                    <div className="kpi-card">
                        <div className="kpi-value">$12,450,000</div>
                        <div className="kpi-label">Ingresos Totales</div>
                        <div className="kpi-change positive"><i className="fas fa-caret-up"></i> 5%</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-value">$8,230,000</div>
                        <div className="kpi-label">Gastos Totales</div>
                        <div className="kpi-change negative"><i className="fas fa-caret-down"></i> 2%</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-value">$4,220,000</div>
                        <div className="kpi-label">Balance</div>
                        <div className="kpi-change positive"><i className="fas fa-caret-up"></i> 12%</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-value">87%</div>
                        <div className="kpi-label">Tasa de Cobro</div>
                        <div className="kpi-change positive"><i className="fas fa-caret-up"></i> 3%</div>
                    </div>
                </div>
            </div>

            <div className="finance-details">
                <div className="detail-card">
                    <div className="detail-header">
                        <h3>Principales Ingresos</h3>
                        <span className="detail-subtitle">Por concepto</span>
                    </div>
                    <div className="detail-content">
                        <div className="income-categories">
                            <div className="category-item">
                                <span className="category-name">Administración</span>
                                <div className="category-bar">
                                    <div className="bar-fill" style={{ width: '85%' }}></div>
                                </div>
                                <span className="category-value">$10,582,500</span>
                            </div>
                            {/* Más categorías */}
                        </div>
                    </div>
                </div>

                <div className="detail-card">
                    <div className="detail-header">
                        <h3>Principales Gastos</h3>
                        <span className="detail-subtitle">Por categoría</span>
                    </div>
                    <div className="detail-content">
                        <div className="expense-categories">
                            <div className="category-item">
                                <span className="category-name">Personal</span>
                                <div className="category-bar">
                                    <div className="bar-fill" style={{ width: '45%' }}></div>
                                </div>
                                <span className="category-value">$3,703,500</span>
                            </div>
                            {/* Más categorías */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para comparar períodos */}
            {showCompareModal && (
                <div className="modal">
                    <div className="modal-content large">
                        <div className="modal-header">
                            <h3>Comparar Períodos Financieros</h3>
                            <button className="modal-close" onClick={() => setShowCompareModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="comparison-controls">
                                <div className="comparison-period">
                                    <h4>Período 1</h4>
                                    <select>
                                        <option value="month">Mes</option>
                                        <option value="quarter">Trimestre</option>
                                        <option value="year">Año</option>
                                    </select>
                                    <select>
                                        <option value="1">Enero</option>
                                        {/* Todos los meses */}
                                    </select>
                                    <select>
                                        {/* Años */}
                                    </select>
                                </div>

                                <div className="comparison-period">
                                    <h4>Período 2</h4>
                                    <select>
                                        <option value="month">Mes</option>
                                        <option value="quarter">Trimestre</option>
                                        <option value="year">Año</option>
                                    </select>
                                    <select>
                                        <option value="1">Enero</option>
                                        {/* Todos los meses */}
                                    </select>
                                    <select>
                                        {/* Años */}
                                    </select>
                                </div>
                            </div>

                            <div className="comparison-results">
                                <div className="comparison-chart-container">
                                    {/* Gráfico de comparación */}
                                    <p>Gráfico comparativo</p>
                                </div>

                                <div className="comparison-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Concepto</th>
                                                <th>Periodo 1</th>
                                                <th>Periodo 2</th>
                                                <th>Diferencia</th>
                                                <th>% Cambio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Datos de comparación */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" onClick={() => setShowCompareModal(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary">Exportar</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

const ManagementModule = ({ residential }) => {
    const [activeTab, setActiveTab] = useState('meetings');
    const [showMeetingModal, setShowMeetingModal] = useState(false);
    const [showNoticeModal, setShowNoticeModal] = useState(false);

    return (
    <div className="management-module">
        <div className="tabs">
            <div
                className={`tab ${activeTab === 'meetings' ? 'active' : ''}`}
                onClick={() => setActiveTab('meetings')}
            >
                Reuniones
            </div>
            <div
                className={`tab ${activeTab === 'notices' ? 'active' : ''}`}
                onClick={() => setActiveTab('notices')}
            >
                Comunicados
            </div>
            <div
                className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => setActiveTab('documents')}
            >
                Documentos
            </div>
        </div>

        {/* Pestaña Reuniones */}
        {activeTab === 'meetings' && (
            <div className="tab-content">
                <Reuniones residential={residential} />
            </div>
        )}

        {/* Pestaña Comunicados */}
        {activeTab === 'notices' && (
            <div className="tab-content">
                <div className="notices-list">
                    <div className="notice-card">
                        <h3>Reparaciones programadas</h3>
                        <p>
                            Informamos que el próximo lunes 10 de agosto se realizarán reparaciones en la
                            piscina. Les agradecemos su comprensión.
                        </p>
                        <span>Publicado el 5 de agosto de 2025</span>
                    </div>
                </div>
            </div>
        )}

        {/* Pestaña Documentos */}
        {activeTab === 'documents' && (
            <div className="tab-content">
                <div className="documents-list">
                    <div className="document-card">
                        <h3>Reglamento Interno</h3>
                        <a href="/docs/reglamento_interno.pdf" target="_blank" rel="noopener noreferrer">
                            Descargar
                        </a>
                    </div>
                </div>
            </div>
        )}
    </div>
);
};

const PQRModule = ({ residential }) => {
    return (
        <section id="pqr" className="module">
            <div className="module-header">
                <h2>Gestión de PQR - {residential?.name}</h2>
                <div className="module-actions">
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} /> Nuevo PQR
                    </button>
                </div>
            </div>
            <div className="module-content">
                <p>Contenido del módulo de PQR...</p>
            </div>
        </section>
    );
};

const SettingsModule = ({ residential }) => {
    return (
        <section id="configuracion" className="module">
            <div className="module-header">
                <h2>Configuración - {residential?.name}</h2>
            </div>
            <div className="module-content">
                <p>Contenido del módulo de configuración...</p>
            </div>
        </section>
    );
};

export default ResidentialAdminPanel;