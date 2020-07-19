import {
    createDepartment,
    findDepartment,
    findAllDepartments,
    updateDepartment, deleteDepartment
} from '@db/entity/Department/DepartmentDao';
import logger from '@shared/Logger';

export const createDepartmentSvc = async (Department: any) => {
    try {
        return await createDepartment(Department);
    } catch (e) {
        console.error('TCL: createDepartmentSvc -> e', e);
        throw e;
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
