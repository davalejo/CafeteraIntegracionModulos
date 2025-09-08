import express from 'express';
import { 
    registrar, 
    validarRegistro, 
    login, 
    validarLogin 
} from '../controllers/auth.controller.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', validarRegistro, registrar);
router.post('/login', validarLogin, login);

export default router;