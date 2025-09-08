import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

import Usuario from '../models/Usuario.js';

export const validarRegistro = [
    body('nombre').isString().isLength({ min: 3 }),
    body('correo').isEmail(),
    body('password').isLength({ min: 6 })
];

export const registrar = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });

    const { nombre, correo, password } = req.body;
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(409).json({ error: 'Correo ya registrado' });

    const u = await Usuario.create({ nombre, correo, password });
    res.status(201).json({ id: u._id, nombre: u.nombre, correo: u.correo });
};

export const validarLogin = [
    body('correo').isEmail(),
    body('password').isLength({ min: 6 })
];

export const login = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });

    const { correo, password } = req.body;
    const u = await Usuario.findOne({ correo });
    if (!u || !(await u.compararPassword(password)))
        return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: u._id, correo: u.correo }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    res.json({ token, usuario: { id: u._id, nombre: u.nombre, correo: u.correo } });
};
