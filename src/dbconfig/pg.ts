import sequelize from "sequelize";
import 'dotenv/config';

const db = new sequelize.Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT ?? 5432),
    dialect: "postgres",
    logging: false, // Desactivar logs de Sequelize
    pool: {
      max: 10, // Máximo número de conexiones en el pool
      min: 0,  // Mínimo número de conexiones en el pool
      acquire: 30000, // Tiempo máximo (ms) que pool intentará conectar antes de arrojar error
      idle: 10000 // Tiempo máximo (ms) que una conexión puede estar inactiva antes de ser liberada
    },
    define: {
      timestamps: false, // No agregar createdAt/updatedAt por defecto
      underscored: true // Usar snake_case en lugar de camelCase para nombres de columnas
    }
  }
);

export default db;