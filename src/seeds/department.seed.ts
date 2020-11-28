import Inventory from '@db/entity/Inventory/Inventory';

export const DepartmentSeed = [
    {
        code: "001",
        name: "Principal",
        description: "Principal",
        inventory : {
            id : 1,
            name : "Inventario principal",
            description : "Inventario principal"
        }
    },
    {
        code: "A01",
        name: "UCI",
        description: "Unidad de Cuidados Intensivos",
        inventory : {
            id : 2,
            name : "Inventario de cuidados intensivos",
            description : "Inventario de cuidados intensivos"
        }
    },
    {
        code: "B01",
        name: "Pediatria",
        description: "Atención a Niños Menores de 8 años",
        inventory : {
            id : 3,
            name : "Inventario de pediatria",
            description : "Inventario de pediatria"
        }
    }
]
