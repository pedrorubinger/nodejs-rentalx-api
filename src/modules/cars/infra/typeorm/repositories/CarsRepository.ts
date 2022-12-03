import { Repository } from "typeorm"

import AppDataSource from "../../../../../shared/infra/typeorm"
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO"
import { ICarsRepository } from "../../../repositories/ICarsRepository"
import { Car } from "../entities/Car"

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = AppDataSource.getRepository(Car)
  }

  async create({
    name,
    license_plate,
    fine_amount,
    description,
    daily_rate,
    category_id,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      license_plate,
      fine_amount,
      category_id,
      description,
      daily_rate,
      brand,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate })

    return car
  }
}

export { CarsRepository }
