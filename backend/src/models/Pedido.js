import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true, min: 0 }
}, { _id: false });

const PedidoSchema = new mongoose.Schema({
    productor: { type: mongoose.Schema.Types.ObjectId, ref: 'Productor', required: true },
    fecha: { type: Date, default: Date.now },
    items: { type: [ItemSchema], required: true },
    estado: { type: String, enum: ['CREADO', 'EN_PROCESO', 'ENTREGADO', 'CANCELADO'], default: 'CREADO' },
    observaciones: { type: String, default: '' }
}, { timestamps: true });

PedidoSchema.virtual('total').get(function () {
    return this.items.reduce((acc, it) => acc + (it.cantidad * it.precioUnitario), 0);
});

PedidoSchema.set('toJSON', { virtuals: true });
PedidoSchema.set('toObject', { virtuals: true });

export default mongoose.model('Pedido', PedidoSchema);