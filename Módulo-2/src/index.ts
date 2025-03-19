import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Middleware de manejo de errores
type ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
const errorHandler: ErrorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
};
app.use(errorHandler);

// Esquemas de validación con Zod
const clienteSchema = z.object({
  nombre: z.string().min(1),
  telefono: z.string().min(1),
  email: z.string().email(),
});
const pistaSchema = z.object({
  numero: z.number(),
  tipo: z.enum(['cubierta', 'exterior']),
  precio_hora: z.number().positive(),
  estado: z.enum(['disponible', 'ocupada']),
});
const empleadoSchema = z.object({
  nombre: z.string().min(1),
  telefono: z.string().min(1),
  email: z.string().email(),
  cargo: z.string().min(1),
});

// Clase para manejar la base de datos
class Database {
  static async createCliente(data: any) {
    return await prisma.cliente.create({ data });
  }
  static async createPista(data: any) {
    return await prisma.pista.create({ data });
  }
  static async createEmpleado(data: any) {
    return await prisma.empleado.create({ data });
  }
  static async getClientes() {
    return await prisma.cliente.findMany();
  }
  static async getPistas() {
    return await prisma.pista.findMany();
  }
  static async getEmpleados() {
    return await prisma.empleado.findMany();
  }
  static async deleteCliente(id_cliente: number) {
    return await prisma.cliente.delete({ where: { id_cliente } });
  }
  static async deletePista(id_pista: number) {
    return await prisma.pista.delete({ where: { id_pista } });
  }
  static async deleteEmpleado(id_empleado: number) {
    return await prisma.empleado.delete({ where: { id_empleado } });
  }
}

// Rutas CRUD
app.post('/clientes', async (req, res, next) => {
  try {
    const data = clienteSchema.parse(req.body);
    const cliente = await Database.createCliente(data);
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
});
app.get('/clientes', async (req, res, next) => {
  try {
    res.json(await Database.getClientes());
  } catch (error) {
    next(error);
  }
});
app.delete('/clientes/:id', async (req, res, next) => {
  try {
    await Database.deleteCliente(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.post('/pistas', async (req, res, next) => {
  try {
    const data = pistaSchema.parse(req.body);
    const pista = await Database.createPista(data);
    res.status(201).json(pista);
  } catch (error) {
    next(error);
  }
});
app.get('/pistas', async (req, res, next) => {
  try {
    res.json(await Database.getPistas());
  } catch (error) {
    next(error);
  }
});
app.delete('/pistas/:id', async (req, res, next) => {
  try {
    await Database.deletePista(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.post('/empleados', async (req, res, next) => {
  try {
    const data = empleadoSchema.parse(req.body);
    const empleado = await Database.createEmpleado(data);
    res.status(201).json(empleado);
  } catch (error) {
    next(error);
  }
});
app.get('/empleados', async (req, res, next) => {
  try {
    res.json(await Database.getEmpleados());
  } catch (error) {
    next(error);
  }
});
app.delete('/empleados/:id', async (req, res, next) => {
  try {
    await Database.deleteEmpleado(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
