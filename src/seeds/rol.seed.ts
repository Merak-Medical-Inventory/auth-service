
export const RolSeed = [
    {
      name: "super usuario",
      description: "rol de super usuario",
      privileges : ["super user"]
    },
    {
      name: "administrador de inventarios",
      description: "rol de administrador de inventarios",
      privileges : ["pedidos","administrador de inventarios"]
    },
    {
      name: "enfermero",
      description: "rol de enfermero",
      privileges: ["equipos medicos"]
    },
    {
      name: "medico",
      description: "rol de medico",
      privileges : ["equipos medicos","pedidos"]
    },
  ];
  