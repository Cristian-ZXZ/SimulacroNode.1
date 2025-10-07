import { Model, DataTypes } from 'sequelize';
import sequelize from './../dbconfig/pg.ts';

class Inscripcion extends Model {
  declare id: number;
  declare estado: string;       
  declare usuarioId: number;    
  declare eventoId: number;     
}

Inscripcion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Inscripcion',
    tableName: 'inscripciones',
    timestamps: false,
  }
);

export default Inscripcion;
