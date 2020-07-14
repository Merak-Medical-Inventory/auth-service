import { Request, Response , NextFunction } from 'express';
import { createPrivilegeSvc} from '@services/privilege';
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
        next(new ErrorHandler(500, e.message));
    }
}