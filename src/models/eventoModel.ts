import { Model, DataTypes } from 'sequelize';
import sequelize from './index.ts';

class Evento extends Model {
  public id!: number;
  public titulo!: string;
  public descripcion!: string;
  public fecha!: Date;
  public ubicacion!: string;
  public capacidad!: number;
  public organizadorId!: number; // FK a Usuario
}

Evento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    organizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Evento',
    tableName: 'eventos',
    timestamps: false,
  }
);

export default Evento;
