require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173'
];

// Middleware CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware para solicitudes preflight (OPTIONS)
+ app.options(/.*/, (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.sendStatus(204);
});

// Otros middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/users', require('./src/routes/userRoutes'));

// Ruta de verificación
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something broke!' });
});

module.exports = app;




// const express = require('express');
// const app = express();
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const { initializeDatabase, testConnection } = require('./config/database');

// // Importar rutas
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', require('./routes/userRoutes')); // Usa un prefijo claro para las rutas

// // middleware para parsear JSON
// app.use(express.json());

// // const app = express();

// // Configuración de CORS más específica
// const corsOptions = {
//     origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
//     credentials: true,
//     optionsSuccessStatus: 200,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//     };

// // Middlewares de seguridad y logging
// app.use(helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" }
// }));
// app.use(cors(corsOptions));
// app.use(morgan('combined'));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Middleware para logging de requests
// app.use((req, res, next) => {
//     console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//     next();
// });

// // Rutas principales
// app.get('/api/health', (req, res) => {
//     res.json({
//         status: 'OK',
//         message: 'Quorum360 API is running',
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV || 'development'
//     });
// });

// // Rutas de la API
// app.use('/api/users', userRoutes);

// // Middleware para rutas no encontradas
// app.use('*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Endpoint no encontrado',
//         path: req.originalUrl
//     });
// });

// // Middleware de manejo de errores global
// app.use((err, req, res, next) => {
//     console.error('Error stack:', err.stack);
    
//     // Error de validación de Joi
//     if (err.isJoi) {
//         return res.status(400).json({
//         success: false,
//         message: 'Error de validación',
//         errors: err.details.reduce((acc, detail) => {
//             acc[detail.path[0]] = detail.message;
//             return acc;
//         }, {})
//         });
//     }

//     // Error de MySQL
//     if (err.code === 'ER_DUP_ENTRY') {
//         return res.status(409).json({
//         success: false,
//         message: 'Datos duplicados',
//         error: 'El registro ya existe'
//         });
//     }

//     // Error genérico
//     res.status(err.status || 500).json({
//         success: false,
//         message: err.message || 'Error interno del servidor',
//         error: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//     });

//     // Inicializar base de datos cuando se carga la aplicación
//     const initApp = async () => {
//     try {
//         console.log('🔧 Inicializando base de datos...');
//         await initializeDatabase();
        
//         console.log('🔍 Probando conexión a la base de datos...');
//         const isConnected = await testConnection();
        
//         if (isConnected) {
//         console.log('✅ Aplicación inicializada correctamente');
//         } else {
//         console.log('❌ Error en la conexión a la base de datos');
//         }
//     } catch (error) {
//         console.error('❌ Error inicializando la aplicación:', error);
//     }
// };

// // Inicializar la aplicación
// initApp();

// module.exports = app;