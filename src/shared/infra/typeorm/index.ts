import { DataSource } from "typeorm"

import { User } from "@modules/accounts/infra/typeorm/entities/User"
import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { Category } from "@modules/cars/infra/typeorm/entities/Category"
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  synchronize: false,
  logging: false,
  entities: [Car, Category, Specification, User],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export default AppDataSource
