import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO"
import { Specification } from "../../infra/typeorm/entities/Specification"
import { ISpecificationsRepository } from "../ISpecificationsRepository"

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = []

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, { name, description })

    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    )
  }

  async findById(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    )
  }
}

export { SpecificationsRepositoryInMemory }
