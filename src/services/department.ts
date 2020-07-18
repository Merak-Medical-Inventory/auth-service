import {createDepartment, findDepartment, findAllDepartments} from '@db/entity/Department/DepartmentDao';

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
