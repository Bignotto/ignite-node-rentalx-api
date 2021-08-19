import { Category } from '../../model/Category';
import { CategoryRepository } from '../../repositories/implementations/CategoryRepository';

class ListCategoriesUseCase {
  constructor(private catetoryRepository: CategoryRepository) {}

  execute(): Category[] {
    return this.catetoryRepository.list();
  }
}

export { ListCategoriesUseCase };