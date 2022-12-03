import { Repository } from "typeorm"

import AppDataSource from "../../../../../shared/infra/typeorm"
import { ICreateCategoryDTO } from "../../../dtos/ICreateCategoryDTO"
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository"
import { Category } from "../entities/Category"

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()

    return categories
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOneBy({ name })

    return category
  }
}

export { CategoriesRepository }
