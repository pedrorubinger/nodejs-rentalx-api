import { inject, injectable } from "tsyringe"

import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO"
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository"

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!")
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
