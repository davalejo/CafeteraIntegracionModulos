Proyecto Cafetera — Integración de Módulos
Este proyecto implementa un sistema de gestión de usuarios, productores y pedidos utilizando Node.js, Express, MongoDB y Angular bajo el stack MEAN.
________________________________________
Backend

1.	Instalar dependencias
cd backend
npm install

2.	Configuración de variables de entorno
Crear el archivo .env en la carpeta backend/ con el siguiente contenido:
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/cafetera
JWT_SECRET=mi_secreto_seguro

3.	Ejecutar el backend en modo desarrollo
npm run dev

4.	Inicializar la base de datos (seed)
El proyecto incluye un script seed.js en backend/src/seeds/ que inserta datos de prueba en MongoDB (usuarios, productores y pedidos).
Para ejecutarlo:
npm run seed
Esto crea la BD cafetera en MongoDB con datos iniciales para pruebas.
________________________________________
Frontend
1.	Instalar dependencias
cd frontend
npm install

2.	Ejecutar el frontend
npm start

3.	Acceder a la aplicación
Abrir en navegador:
http://localhost:4200
________________________________________
Flujo de autenticación y módulos
•	Login / Register → públicos
•	Productores → protegidos con AuthGuard
•	Pedidos → protegidos con AuthGuard
•	El TokenInterceptor añade automáticamente el Authorization: Bearer <token> en cada request autenticado.
________________________________________
Endpoints principales del backend
•	POST /api/v1/auth/register → Registro de usuario
•	POST /api/v1/auth/login → Login de usuario
•	GET /api/v1/productores → Listar productores (requiere token)
•	POST /api/v1/productores → Crear productor (requiere token)
•	GET /api/v1/pedidos → Listar pedidos (requiere token)
•	POST /api/v1/pedidos → Crear pedido (requiere token)
________________________________________
Entregables
•	Código fuente backend y frontend (GitHub).
•	Script seed.js para recrear la BD en MongoDB.
•	Documentación completa en este README.md.
•	Evidencia en video mostrando:
    o	Conexión backend + frontend + BD
    o	Login/Register funcionando
    o	Listado y creación de productores y pedidos protegidos con token