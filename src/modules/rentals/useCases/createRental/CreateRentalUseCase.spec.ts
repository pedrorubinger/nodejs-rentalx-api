import dayjs from "dayjs"

import { DayjsDateProvider } from "../../../../shared/container/providers/implementations/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory"
import { RentalsRepositoryInMemory } from "../../repositories/inMemory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let dayjsDateProvider: DayjsDateProvider
let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )
  })

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "test",
      brand: "test",
      category_id: "123",
      license_plate: "123",
      daily_rate: 100,
      fine_amount: 10,
    })

    const rental = await createRentalUseCase.execute({
      user_id: "1",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another opened to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "12345677888",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    })

    await expect(
      createRentalUseCase.execute({
        user_id: "1",
        car_id: "111",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"))
  })

  it("should not be able to create a new rental if there is another opened to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "12345677888",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    })

    expect(
      await createRentalUseCase.execute({
        user_id: "2",
        car_id: "12345677888",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"))
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1",
        car_id: "1kskofd",
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
