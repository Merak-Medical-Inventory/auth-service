import Inventory from "@db/entity/Inventory/Inventory";

const principalInventory = new Inventory();
principalInventory.id = 1;
principalInventory.name = "Inventario principal";
principalInventory.description = "Inventario principal";
export {
    principalInventory
}