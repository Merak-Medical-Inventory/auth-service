import { Request, Response , NextFunction } from 'express';
import { createPrivilegeSvc, findAllPrivilegeSvc, findPrivilegeSvc} from '@services/privilege';
import { handleSuccess } from '@helpers/succesHandler'
import { ErrorHandler } from '@helpers/ErrorHandler/'

interface IRequest extends Request {
  [key: string]: any;
}

export const createPrivilegeCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const privilege = req.body;
    try{
        const data =  await createPrivilegeSvc(privilege);
        handleSuccess(201, 'Privilege created', res, next,data);
    }catch (e){
        next(e);
    }
}

export const getAllPrivilegesCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const privilege = req.body;
    try{
        const data =  await findAllPrivilegeSvc(privilege);
        handleSuccess(201, 'Privileges', res, next,data);
    }catch (e){
        next(e);
    }
}

export const getPrivilegeByIdCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const {id} = req.params;
    try{
        const data =  await findPrivilegeSvc({id});
        handleSuccess(201, 'Privileges', res, next,data);
    }catch (e){
        next(e);
    }
}