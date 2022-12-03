import { ICreateCarDTO } from "../../dtos/ICreateCarDTO"
import { Car } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../ICarsRepository"

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = []

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async create({
    name,
    description,
    license_plate,
    fine_amount,
    daily_rate,
    category_id,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      license_plate,
      fine_amount,
      daily_rate,
      category_id,
      brand,
    })

    this.cars.push(car)

    return car
  }
}

export { CarsRepositoryInMemory }
