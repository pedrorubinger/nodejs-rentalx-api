import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO"
import { Category } from "../../infra/typeorm/entities/Category"
import { ICategoriesRepository } from "../ICategoriesRepository"

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)
  }

  async list(): Promise<Category[]> {
    return this.categories
  }
}

export { CategoriesRepositoryInMemory }
