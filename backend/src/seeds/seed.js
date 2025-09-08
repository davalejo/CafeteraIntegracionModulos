import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/database.js';
import Usuario from '../models/Usuario.js';
import Productor from '../models/Productor.js';
import Pedido from '../models/Pedido.js';

async function seed() {
    await connectDB(process.env.MONGO_URI);
    console.log('Eliminando datos previos...');
    await Usuario.deleteMany({});
    await Productor.deleteMany({});
    await Pedido.deleteMany({});

    console.log('Creando usuario admin...');
    const admin = new Usuario({ nombre: 'Admin', correo: 'admin@cafetera.com', password: 'Secreta123' });
    await admin.save();

    console.log('Creando productores...');
    const p1 = await Productor.create({ nombre: 'Juan Pérez', correo: 'juan@example.com', telefono: '3123456789' });
    const p2 = await Productor.create({ nombre: 'Ana Gómez', correo: 'ana@example.com', telefono: '3109876543' });

    console.log('Creando pedido de ejemplo...');
    await Pedido.create({
        productor: p1._id,
        items: [{ producto: 'Café Supremo', cantidad: 2, precioUnitario: 35000 }],
        estado: 'CREADO',
        observaciones: 'Entrega en finca'
    });

    console.log('Seed finalizado. Usuario: admin@cafetera.com / Secreta123');
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
