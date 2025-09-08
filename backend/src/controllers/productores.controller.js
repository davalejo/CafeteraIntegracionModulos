import { body, validationResult } from 'express-validator';
import Productor from '../models/Productor.js';

export const validarProductor = [
    body('nombre').isString().isLength({ min: 3, max: 50 }),
    body('correo').optional({ nullable: true, checkFalsy: true }).isEmail(),
    body('telefono').optional({ nullable: true, checkFalsy: true }).matches(/^\d{10}$/)
];

export const crear = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });
    const p = await Productor.create(req.body);
    res.status(201).json(p);
};

export const listar = async (_req, res) => {
    const all = await Productor.find().sort({ createdAt: -1 });
    res.json(all);
};

export const obtener = async (req, res) => {
    const p = await Productor.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'No encontrado' });
    res.json(p);
};

export const actualizar = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });
    const p = await Productor.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!p) return res.status(404).json({ error: 'No encontrado' });
    res.json(p);
};

export const eliminar = async (req, res) => {
    const p = await Productor.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
};