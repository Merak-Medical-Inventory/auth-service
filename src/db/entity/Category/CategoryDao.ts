import { getManager, getConnection } from 'typeorm';
import { Category} from '@db/entity/Category/Category';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createCategory = async (category: any) => {
    try {
        const categoryRepository = getManager().getRepository(Category);
        await categoryRepository.save(category);
        return category;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findCategory = async (id: number) => {
    try {
        const category = await getConnection()
            .createQueryBuilder()
            .select('category')
            .from(Category, 'category')
            .where('category.id = :id', {id})
            .getOne();
        return category;
    } catch (error) {
        console.log(id);
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllCategories = async () => {
    try {
        const categoryRepository = getManager().getRepository(Category);
        const categories = await categoryRepository.find();
        return categories;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
