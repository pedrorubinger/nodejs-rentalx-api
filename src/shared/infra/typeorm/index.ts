import { DataSource } from "typeorm"

import { User } from "../../../modules/accounts/infra/typeorm/entities/User"
import { UserToken } from "../../../modules/accounts/infra/typeorm/entities/UserToken"
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car"
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category"
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification"
import { Rental } from "../../../modules/rentals/infra/typeorm/entities/Rental"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  synchronize: false,
  logging: false,
  entities: [Car, Category, Specification, User, Rental, UserToken],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  const defaultOptions = AppDataSource.options

  return AppDataSource.setOptions({
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database:
      process.env.NODE_ENV === "test"
        ? "rentalx_test"
        : (defaultOptions.database as string),
  }).initialize()
}

export default AppDataSource
