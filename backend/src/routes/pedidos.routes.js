import express from 'express';
import { requiereAuth } from '../middleware/auth.js';
import { 
    crear, 
    listar, 
    obtener, 
    actualizar, 
    eliminar, 
    validarPedido 
} from '../controllers/pedidos.controller.js';

const router = express.Router();

// Middleware de autenticación para todas las rutas
router.use(requiereAuth);

// Rutas CRUD para pedidos
router.get('/', listar);
router.get('/:id', obtener);
router.post('/', validarPedido, crear);
router.put('/:id', validarPedido, actualizar);
router.delete('/:id', eliminar);

export default router;