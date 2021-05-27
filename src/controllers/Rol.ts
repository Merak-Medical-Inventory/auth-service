import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import { createRolSvc, findAllRolsSvc, findRolSvc } from '@services/Rol';
import { ErrorHandler } from '@helpers/ErrorHandler';

interface IRequest extends Request {
  [key: string]: any;
}

export const createRolCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const rol = req.body;
    try{
        const data =  await createRolSvc(rol);
        handleSuccess(201, 'Rol creado', res, next,data);
    }catch (e){
        next(e);
    }
}

export const getAllRolsCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const rol = req.body;
    try{
        const data =  await findAllRolsSvc(rol);
        handleSuccess(201, 'Roles', res, next,data);
    }catch (e){
        next(e);
    }
}

export const getRolByIdCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const {id} = req.params;
    try{
        const data =  await findRolSvc({id});
        if(!data) throw new ErrorHandler(404,"Rol no encontrado")
        handleSuccess(201, 'Rol', res, next,data);
    }catch (e){
        next(e);
    }
}