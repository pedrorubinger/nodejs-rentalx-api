import { ICreateCarDTO } from "../dtos/ICreateCarDTO"
import { IListAvailableCarsDTO } from "../dtos/IListAvailableCarsDTO"
import { Car } from "../infra/typeorm/entities/Car"

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findById(id: string): Promise<Car>
  findAvailable(data?: IListAvailableCarsDTO): Promise<Car[]>
  updateAvailable(id: string, available: boolean): Promise<void>
}

export { ICarsRepository }
