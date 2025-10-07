import { Model, DataTypes } from 'sequelize';
import db from '../dbconfig/pg.ts';

class Usuario extends Model {
  id!: number;
  nombre!: string;
  email!: string;
  password!: string;
  rol!: 'admin' | 'participante' | 'organizador';
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'participante', 'organizador'),
    allowNull: false,
    defaultValue: 'participante'
  }
}, {
  sequelize: db,
  modelName: 'Usuario',
  tableName: 'usuarios'
});

export default Usuario;
