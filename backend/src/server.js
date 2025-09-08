// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import authRoutes from './routes/auth.routes.js';
import productoresRoutes from './routes/productores.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CONFIGURACIÓN FLEXIBLE DE MONGODB URI
const getMongoURI = () => {
    return process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cafetera';
};
const MONGO_URI = getMongoURI();

// Verificaciones mínimas de entorno
const validateEnvironment = () => {
    const missing = [];
    if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');

    if (missing.length > 0) {
        console.error('❌ VARIABLES DE ENTORNO FALTANTES:');
        missing.forEach(name => console.error(`   - ${name}`));
        console.error('\n📝 Crear archivo .env con las variables requeridas (por ejemplo .env.example) y reiniciar');
        process.exit(1);
    }
};

validateEnvironment();

// CORS options
const corsOptions = {
    origin: [
        process.env.CORS_ORIGIN,
        process.env.FRONTEND_URL,
        'http://localhost:4200',
        'http://127.0.0.1:4200'
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Conexión a MongoDB (esperamos antes de arrancar)
const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            maxIdleTimeMS: 30000,
            minPoolSize: 2
        };

        console.log('🔄 Conectando a MongoDB...');
        try {
            console.log(`📍 URI: ${MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
        } catch (_) {
            console.log('📍 URI: (no se pudo mostrar enmascarada)');
        }

        const conn = await mongoose.connect(MONGO_URI, options);

        console.log('✅ ===============================');
        console.log(`📊 MongoDB conectado`);
        console.log(`🏠 Host: ${conn.connection.host}`);
        console.log(`📁 DB: ${conn.connection.name}`);
        console.log('✅ ===============================');
    } catch (error) {
        console.error('❌ ERROR DE CONEXIÓN MONGODB:', error.message);
        console.error('🔧 Verifica que MongoDB esté ejecutándose y la URI en .env');
        process.exit(1);
    }
};

// Montar rutas (compatibilidad /api y /api/v1)
app.use('/api/auth', authRoutes);
app.use('/api/productores', productoresRoutes);
app.use('/api/pedidos', pedidosRoutes);

// Rutas v1 (alias para compatibilidad con pruebas previas)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/productores', productoresRoutes);
app.use('/api/v1/pedidos', pedidosRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado';
    res.status(200).json({
        status: 'OK',
        message: 'API Cafetera funcionando',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: { status: dbStatus, name: mongoose.connection.name || null },
        version: '1.0.0'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('🚨 Error Global Capturado:', { message: err.message, url: req.url, method: req.method });
    res.status(err.status || 500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno',
        timestamp: new Date().toISOString(),
        path: req.path
    });
});

// 404 Handler (lista rutas disponibles)
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        message: `La ruta ${req.method} ${req.originalUrl} no existe`,
        availableRoutes: [
            'GET /api/health',
            'POST /api/auth/register',
            'POST /api/auth/login',
            'GET /api/productores',
            'GET /api/pedidos',
            'POST /api/v1/auth/register',
            'POST /api/v1/auth/login'
        ]
    });
});

// Iniciar servidor solo después de conectar DB
(async () => {
    await connectDB();
    const server = app.listen(PORT, () => {
        console.log('🚀 ===================================');
        console.log('     SERVIDOR CAFETERA BACKEND');
        console.log('🚀 ===================================');
        console.log(`📡 Puerto: ${PORT}`);
        console.log(`🌍 URL: http://localhost:${PORT}`);
        console.log(`🔧 Entorno: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🎯 Health: http://localhost:${PORT}/api/health`);
        console.log('🚀 ===================================');
    });

    // Graceful shutdown
    const shutdown = async () => {
        console.log('\n🔄 Iniciando cierre graceful...');
        try {
            await mongoose.connection.close();
            server.close(() => {
                console.log('👋 Servidor cerrado exitosamente');
                process.exit(0);
            });
        } catch (error) {
            console.error('❌ Error durante el cierre:', error);
            process.exit(1);
        }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
})();


/* import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Cargar variables de entorno
dotenv.config();

console.log('🔄 PASO 1: Variables de entorno cargadas');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de MongoDB URI
const getMongoURI = () => {
    return process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cafetera';
};

const MONGO_URI = getMongoURI();

console.log('🔄 PASO 2: Configuración inicial completada');

// Configuración CORS básica
const corsOptions = {
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

console.log('🔄 PASO 3: CORS configurado');

// Middlewares básicos
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

console.log('🔄 PASO 4: Middlewares básicos aplicados');

// Conexión MongoDB
const connectDB = async () => {
    try {
        console.log('🔄 PASO 5: Iniciando conexión MongoDB...');
        console.log(`📍 URI: ${MONGO_URI}`);

        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });

        console.log('✅ ===============================');
        console.log(`📊 MongoDB Conectado Exitosamente`);
        console.log(`🏠 Host: ${conn.connection.host}`);
        console.log(`📁 Base de datos: ${conn.connection.name}`);
        console.log(`🚀 Puerto: ${conn.connection.port}`);
        console.log('✅ ===============================');
        console.log('🔄 PASO 6: MongoDB conectado exitosamente');

    } catch (error) {
        console.error('❌ Error conectando MongoDB:', error.message);
        process.exit(1);
    }
};

// PUNTO CRÍTICO: Comentar importaciones de rutas temporalmente
console.log('🔄 PASO 7: Antes de importar rutas...');

// Rutas básicas de prueba (SIN IMPORTACIONES EXTERNAS)
app.get('/api/health', (req, res) => {
    console.log('📡 Health check solicitado');
    res.status(200).json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'
    });
});

app.get('/api/test', (req, res) => {
    console.log('🧪 Test endpoint solicitado');
    res.json({
        message: 'Test exitoso',
        server: 'Cafetera Backend',
        timestamp: new Date().toISOString()
    });
});

console.log('🔄 PASO 8: Rutas básicas configuradas');

// Conectar base de datos
console.log('🔄 PASO 9: Llamando connectDB...');
await connectDB();
console.log('🔄 PASO 10: connectDB completado');

// Error handler básico
app.use((err, req, res, next) => {
    console.error('🚨 Error capturado:', err.message);
    res.status(500).json({
        error: 'Error interno',
        message: err.message
    });
});

console.log('🔄 PASO 11: Error handler configurado');

// 404 handler
app.use('*', (req, res) => {
    console.log(`🔍 Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.originalUrl
    });
});

console.log('🔄 PASO 12: 404 handler configurado');

console.log('🔄 PASO 13: Antes de app.listen...');

// Iniciar servidor
app.listen(PORT, (error) => {
    if (error) {
        console.error('❌ Error iniciando servidor:', error);
        return;
    }
    
    console.log('🔄 PASO 14: Servidor iniciado exitosamente');
    console.log('🚀 ===================================');
    console.log('     SERVIDOR DEBUG ACTIVO');
    console.log('🚀 ===================================');
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🌍 URL: http://localhost:${PORT}`);
    console.log(`🎯 Health: http://localhost:${PORT}/api/health`);
    console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
    console.log('🚀 ===================================');
    console.log('✅ SERVIDOR COMPLETAMENTE INICIADO');
});

console.log('🔄 PASO 15: app.listen() llamado'); */