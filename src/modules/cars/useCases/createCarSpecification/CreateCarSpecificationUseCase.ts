import { inject, injectable } from "tsyringe"

import { AppError } from "../../../../shared/errors/AppError"
import { Car } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../../repositories/ICarsRepository"
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id)

    if (!car) {
      throw new AppError("Car does not exist!", 404)
    }

    const specifications = await this.specificationsRepository.findById(
      specifications_id
    )

    car.specifications = specifications

    await this.carsRepository.create(car)

    return car
  }
}

export { CreateCarSpecificationUseCase }
