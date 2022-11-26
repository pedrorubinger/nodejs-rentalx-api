import { inject, injectable } from "tsyringe"

import { AppError } from "../../../../errors/AppError"
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
      throw new AppError("Specification already exists!")
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
