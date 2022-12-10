import { In, Repository } from "typeorm"

import AppDataSource from "../../../../../shared/infra/typeorm"
import { ICreateSpecificationDTO } from "../../../dtos/ICreateSpecificationDTO"
import { ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository"
import { Specification } from "../entities/Specification"

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async findById(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({ id: In(ids) })

    return specifications
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOneBy({ name })

    return specification
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description })

    await this.repository.save(specification)

    return specification
  }
}

export { SpecificationsRepository }
