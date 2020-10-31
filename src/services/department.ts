import {
    createDepartment,
    findDepartment,
    findAllDepartments,
    updateDepartment, deleteDepartment
} from '@db/entity/Department/DepartmentDao';
import logger from '@shared/Logger';
import Inventory from '@db/entity/Inventory/Inventory';
import { getManager, EntityManager } from 'typeorm';
import Department from '@db/entity/Department/Department';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createDepartmentSvc = async (Department: Department) : Promise<Department>  => {
    try {
        const manager : EntityManager = getManager();
        const deparment : Department = await createDepartment(Department);
        const inventory : Inventory = new Inventory();
        inventory.deparment = deparment;
        inventory.name = `Inventario del departamento ${deparment.description}`
        inventory.description = `Inventario del departamento ${deparment.description}`
        await manager.save(inventory);
        return deparment;
    } catch (e) {
        console.error('TCL: createDepartmentSvc -> e', e);
        throw new ErrorHandler(500,'Unknown Error while creating a new deparment');
    }
};

export const findDepartmentSvc = async (id: any) => {
    try {
        return await findDepartment(id);
    } catch (e) {
        console.error('TCL: findDepartmentSvc -> e', e);
        throw e;
    }
};

export const findAllDepartmentsSvc = async () => {
    try {
        return await findAllDepartments();
    } catch (e) {
        console.error('TCL: findAllDepartmentsSvc -> e', e);
        throw e;
    }
};

export const updateDepartmentSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateDepartment(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateDepartmentSvc -> e', e);
        throw e;
    }
};

export const deleteDepartmentSvc = async (id: any) => {
    try {
        return await deleteDepartment(id);
    } catch (e) {
        logger.error('TCL: deleteDepartmentSvc -> e', e);
        throw e;
    }
};
