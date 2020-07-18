import { Request, Response , NextFunction } from 'express';
import { createDepartmentSvc, findDepartmentSvc, findAllDepartmentsSvc} from '@services/Department';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';

interface IRequest extends Request {
    [key: string]: any;
}

export const createDepartmentCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const Department = req.body;
    try{
        const data =  await createDepartmentSvc(Department);
        handleSuccess(201, 'Departamento Creado', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findDepartmentCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findDepartmentSvc(id);
        handleSuccess(200, 'Información del Departamento', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findDepartmentCtrl', e);
        next(e);
    }
};

export const findAllDepartmentsCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllDepartmentsSvc()
        handleSuccess(200, 'Información de los Departamentos', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllDepartmentsCtrl', e);
        next(e);
    }
};
