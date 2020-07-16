import { Request, Response , NextFunction } from 'express';
import { createCategorySvc, findCategorySvc, findAllCategoriesSvc} from '@services/category';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';

interface IRequest extends Request {
    [key: string]: any;
}

export const createCategoryCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const category = req.body;
    try{
        const data =  await createCategorySvc(category);
        handleSuccess(201, 'Categoría Creada', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findCategoryCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findCategorySvc(id);
        handleSuccess(200, 'Información de la Categoría', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findCategoryCtrl', e);
        next(e);
    }
};

export const findAllCategoriesCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllCategoriesSvc()
        handleSuccess(200, 'Información de las Categorías', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllCategoriesCtrl', e);
        next(e);
    }
};
