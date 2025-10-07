import 'dotenv/config';
import express from 'express';
import router from './routes/eventoRoutes.ts';
import db from './dbconfig/pg.ts';
import Usuario from './models/usuarioModel.ts';
import bcrypt from 'bcrypt';
import { connectToMongo } from './dbconfig/mongo.ts';
import usuarioRoutes from './routes/usuarioRoutes.ts'
import "./models/relaciones.ts";

await db.sync({ alter: true });

const app = express();

app.use(express.json());
app.use('/api/eventos', router);
app.use('/api/usuarios', usuarioRoutes)

app.get('/', (req, res) => {
  res.send('hola mundo');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conectar a PostgreSQL
    await db.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa');

    // Sincronizar modelos
    await db.sync();

    //Crear usuario admin si no existe
    const admin = await Usuario.findOne({ where: { email: 'admin@example.com' } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin321', 10);
      await Usuario.create({
        nombre: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        rol: 'admin',
      });
      console.log('Usuario admin creado');
    }

    // Conectar a MongoDB
    await connectToMongo();

    // Levantar servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
}

// Ejecutalo todo
startServer();
