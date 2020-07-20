import { Request, Response , NextFunction } from 'express';
import {
    createDepartmentSvc,
    findDepartmentSvc,
    findAllDepartmentsSvc,
    updateDepartmentSvc,
    deleteDepartmentSvc
} from '@services/department';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

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
        logger.error('ERROR: controller -> findDepartmentCtrl', e);
        next(e);
    }
};

export const findAllDepartmentsCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllDepartmentsSvc()
        handleSuccess(200, 'Información de los Departamentos', res, next, data);
    } catch (e) {
        logger.error('ERROR: controller -> findAllDepartmentsCtrl', e);
        next(e);
    }
};

export const updateDepartmentCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateDepartmentSvc(id, update);
        handleSuccess(
            201,
            'Departamento actualizado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updateDepartmentCtrl', e);
        next(e);
    }
};

export const deleteDepartmentCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deleteDepartmentSvc(id);
        handleSuccess(
            201,
            'Departamento eliminado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deleteDepartmentCtrl', e);
        next(e);
    }
};
