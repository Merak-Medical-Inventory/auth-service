import {createCategory, findCategory, findAllCategories} from '@db/entity/Category/CategoryDao';

export const createCategorySvc = async (category: any) => {
    try {
        return await createCategory(category);
    } catch (e) {
        console.error('TCL: createCategorySvc -> e', e);
        throw e;
    }
};

export const findCategorySvc = async (id: any) => {
    try {
        return await findCategory(id);
    } catch (e) {
        console.error('TCL: findCategorySvc -> e', e);
        throw e;
    }
};

export const findAllCategoriesSvc = async () => {
    try {
        return await findAllCategories();
    } catch (e) {
        console.error('TCL: findAllCategoriesSvc -> e', e);
        throw e;
    }
};
