import { Model, DataTypes } from 'sequelize';
import sequelize from './../dbconfig/pg.ts';

class Evento extends Model {
  declare id: number;
  declare titulo: string;
  declare descripcion: string;
  declare fecha: Date;
  declare ubicacion: string;
  declare capacidad: number;
  declare organizadorId: number;
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
