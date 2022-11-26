import { Repository } from "typeorm"

import AppDataSource from "../../../../database"
import { Specification } from "../../entities/Specification"
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository"

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOneBy({ name })

    return specification
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description })

    await this.repository.save(specification)
  }
}

export { SpecificationsRepository }
