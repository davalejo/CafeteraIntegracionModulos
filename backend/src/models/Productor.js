import mongoose from 'mongoose';

const ProductorSchema = new mongoose.Schema({
    nombre: { type: String, required: true, minlength: 3, maxlength: 50 },
    correo: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, default: null },
    telefono: { type: String, match: /^\d{10}$/, default: null }
}, { timestamps: true });

export default mongoose.model('Productor', ProductorSchema);
