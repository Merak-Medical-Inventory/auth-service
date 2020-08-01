
export const RolSeed = [
    {
      name: "Superusuario",
      description: "Rol de Superusuario",
      privileges : ["Superusuario"]
    },
    {
      name: "Administrador",
      description: "Rol de Administrador",
      privileges : ["Pedidos","Administrador"]
    },
    {
      name: "Enfermero",
      description: "Rol de Enfermero",
      privileges: ["Equipos Medicos"]
    },
    {
      name: "Medico",
      description: "Rol de Medico",
      privileges : ["Equipos Medicos","Pedidos"]
    },
  ];
