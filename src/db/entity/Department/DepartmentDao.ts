import { getManager, getConnection } from 'typeorm';
import { Department} from '@db/entity/Department/Department';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createDepartment = async (department: any) => {
    try {
        const departmentRepository = getManager().getRepository(Department);
        await departmentRepository.save(department);
        return department;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findDepartment = async (id: number) => {
    try {
        const department = await getConnection()
            .createQueryBuilder()
            .select('department')
            .from(Department, 'department')
            .where('department.id = :id', {id})
            .getOne();
        return department;
    } catch (error) {
        console.log(id);
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllDepartments = async () => {
    try {
        const departmentRepository = getManager().getRepository(Department);
        const departments = await departmentRepository.find();
        return departments;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
