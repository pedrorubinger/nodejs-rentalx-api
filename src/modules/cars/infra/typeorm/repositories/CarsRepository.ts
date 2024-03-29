import { Repository } from "typeorm"

import AppDataSource from "../../../../../shared/infra/typeorm"
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO"
import { IListAvailableCarsDTO } from "../../../dtos/IListAvailableCarsDTO"
import { ICarsRepository } from "../../../repositories/ICarsRepository"
import { Car } from "../entities/Car"

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = AppDataSource.getRepository(Car)
  }

  async create({
    id,
    name,
    license_plate,
    fine_amount,
    description,
    daily_rate,
    category_id,
    brand,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      license_plate,
      fine_amount,
      category_id,
      description,
      daily_rate,
      brand,
      specifications,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate })

    return car
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneBy({ id })

    return car
  }

  async findAvailable(data?: IListAvailableCarsDTO): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })

    if (data?.brand) {
      carsQuery.andWhere("c.brand = :brand", { brand: data.brand })
    }

    if (data?.category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id: data.category_id,
      })
    }

    if (data?.name) {
      carsQuery.andWhere("c.name = :name", { name: data.name })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute()
  }
}

export { CarsRepository }
