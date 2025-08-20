require('dotenv').config();
const app = require('./app');
const { initializeDatabase } = require('./src/config/database'); // Importa la función de inicialización de la base de datos
const reunionesRoutes = require('./src/routes/reunionesRoutes');
app.use('/api/reuniones', reunionesRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();



// require('dotenv').config();
// const app = require('./src/app');
// const { closePool } = require('./src/config/database');
// // const userRoutes = require('./routes/userRoutes');
// // app.use('/api/users', userRoutes); // Usa un prefijo claro para las rutas

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`🌐 API available at: http://localhost:${PORT}/api`);
//     console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
//     console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// // Manejo graceful del cierre del servidor
// const gracefulShutdown = async (signal) => {
//     console.log(`\n📡 Received ${signal}. Shutting down gracefully...`);
    
//     server.close(async () => {
//         console.log('🔒 HTTP server closed.');
        
//         try {
//         await closePool();
//         console.log('✅ Graceful shutdown completed.');
//         process.exit(0);
//         } catch (error) {
//         console.error('❌ Error during shutdown:', error);
//         process.exit(1);
//         }
//     });

//     // Force close server after 10 seconds
//     setTimeout(() => {
//         console.error('⚠️ Could not close connections in time, forcefully shutting down');
//         process.exit(1);
//     }, 10000);
//     };

//     // Escuchar señales de terminación
//     process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
//     process.on('SIGINT', () => gracefulShutdown('SIGINT'));

//     // Manejo de errores no capturados
//     process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//     });

//     process.on('uncaughtException', (error) => {
//     console.error('Uncaught Exception thrown:', error);
//     process.exit(1);
// });

