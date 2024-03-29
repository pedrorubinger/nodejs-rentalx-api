import { ICreateCarDTO } from "../../dtos/ICreateCarDTO"
import { IListAvailableCarsDTO } from "../../dtos/IListAvailableCarsDTO"
import { Car } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../ICarsRepository"

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = []

  async findAvailable({
    category_id,
    name,
    brand,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (name && car.name === name) ||
        (category_id && car.category_id === category_id)
      ) {
        return car
      }

      return null
    })
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)
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

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id)

    this.cars[findIndex].available = available
  }
}

export { CarsRepositoryInMemory }
