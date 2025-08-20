const mysql = require('mysql2/promise');

// Configuración de la conexión a MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'hatian',
    database: process.env.DB_NAME || 'quorum360-db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    idleTimeout: 60000, // Tiempo en ms antes de que una conexión inactiva sea cerrada
    enableKeepAlive: true, // Mantener conexiones activas
    keepAliveInitialDelay: 10000, // Tiempo inicial para keepalive
    // acquireTimeout: 10000,
    // timeout: 60000,
    // reconnect: true,
    multipleStatements: true,
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para inicializar la base de datos
const initializeDatabase = async () => {
    try {
        // Crear conexión temporal sin especificar database
        const tempConnection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password
        });

    // Crear base de datos si no existe
    await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✅ Database ${dbConfig.database} created or exists`);
    
    await tempConnection.end();

    // Ahora usar el pool para crear las tablas
    await createTables();
    
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    }
};

// Función para crear las tablas necesarias
const createTables = async () => {
    try {
    // Tabla de usuarios
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            correo VARCHAR(255) UNIQUE NOT NULL,
            telefono VARCHAR(20) NOT NULL,
            pais VARCHAR(50) NOT NULL,
            nombre_propiedad VARCHAR(255) NOT NULL,
            tipo VARCHAR(50) NOT NULL,
            numero VARCHAR(50) NOT NULL,
            contrasena VARCHAR(255) NOT NULL,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            activo BOOLEAN DEFAULT TRUE,
            INDEX idx_correo (correo),
            INDEX idx_telefono (telefono)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await pool.execute(createUsersTable);
    console.log('✅ Table usuarios created or exists');

    // Tabla de reuniones
    const createReunionesTable = `
    CREATE TABLE IF NOT EXISTS reuniones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

await pool.execute(createReunionesTable);
console.log('✅ Table reuniones created or exists');

    // Tabla de sesiones (opcional para manejo de tokens)
    const createSessionsTable = `
        CREATE TABLE IF NOT EXISTS sesiones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            token VARCHAR(500) NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
            INDEX idx_token (token(255)),
            INDEX idx_usuario_id (usuario_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await pool.execute(createSessionsTable);
    console.log('✅ Table sesiones created or exists');

    } catch (error) {
        console.error('❌ Error creating tables:', error);
        throw error;
    }
};

// Función para probar la conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        console.log('✅ Database connection successful');
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
};

// Función para cerrar el pool de conexiones
const closePool = async () => {
    try {
        await pool.end();
        console.log('✅ Database pool closed');
    } catch (error) {
        console.error('❌ Error closing database pool:', error);
    }
};

module.exports = {
    pool,
    initializeDatabase,
    testConnection,
    closePool
};