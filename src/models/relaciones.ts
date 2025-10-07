import Usuario from "./usuarioModel.ts";
import Evento from "./eventoModel.ts";


Usuario.hasMany(Evento, {
  foreignKey: "organizadorId",
  as: "eventos",
});


Evento.belongsTo(Usuario, {
  foreignKey: "organizadorId",
  as: "organizador",
});

export { Usuario, Evento };
