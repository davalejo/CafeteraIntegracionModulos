import { body, validationResult } from 'express-validator';
import Pedido from '../models/Pedido.js';
import Productor from '../models/Productor.js';

export const validarPedido = [
    body('productor').isMongoId(),
    body('items').isArray({ min: 1 }),
    body('items.*.producto').isString().notEmpty(),
    body('items.*.cantidad').isInt({ min: 1 }),
    body('items.*.precioUnitario').isFloat({ min: 0 })
];

export const crear = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });

    const existeProd = await Productor.findById(req.body.productor);
    if (!existeProd) return res.status(400).json({ error: 'Productor no existe' });

    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
};

export const listar = async (_req, res) => {
    const all = await Pedido.find().populate('productor', 'nombre correo telefono').sort({ createdAt: -1 });
    res.json(all);
};

export const obtener = async (req, res) => {
    const ped = await Pedido.findById(req.params.id).populate('productor', 'nombre correo telefono');
    if (!ped) return res.status(404).json({ error: 'No encontrado' });
    res.json(ped);
};

export const actualizar = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });
    const ped = await Pedido.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!ped) return res.status(404).json({ error: 'No encontrado' });
    res.json(ped);
};

export const eliminar = async (req, res) => {
    const ped = await Pedido.findByIdAndDelete(req.params.id);
    if (!ped) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
};
