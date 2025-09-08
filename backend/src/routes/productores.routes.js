import express from 'express';
import { requiereAuth } from '../middleware/auth.js';
import { 
    crear, 
    listar, 
    obtener, 
    actualizar, 
    eliminar, 
    validarProductor 
} from '../controllers/productores.controller.js';

const router = express.Router();

// Middleware de autenticación para todas las rutas
router.use(requiereAuth);

// Rutas CRUD para productores
router.get('/', listar);
router.get('/:id', obtener);
router.post('/', validarProductor, crear);
router.put('/:id', validarProductor, actualizar);
router.delete('/:id', eliminar);

export default router;