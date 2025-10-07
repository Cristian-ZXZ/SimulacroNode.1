import { Model, DataTypes } from 'sequelize';
import sequelize from './index.ts';

class Inscripcion extends Model {
  public id!: number;
  public estado!: string;       
  public usuarioId!: number;    
  public eventoId!: number;     
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
