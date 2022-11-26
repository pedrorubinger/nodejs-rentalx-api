import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO"
import { Category } from "../entities/Category"

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
  list(): Promise<Category[]>
}

export { ICategoriesRepository }
