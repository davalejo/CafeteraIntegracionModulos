import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, minlength: 3, maxlength: 50 },
    correo: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UsuarioSchema.methods.compararPassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

export default mongoose.model('Usuario', UsuarioSchema);