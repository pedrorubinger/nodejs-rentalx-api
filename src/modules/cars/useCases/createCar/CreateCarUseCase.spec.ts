import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "description test",
      daily_rate: 100,
      fine_amount: 60,
      category_id: "catgory",
      brand: "brand",
      license_plate: "ABC-1234",
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car which license plate is already registered", async () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: "Name car",
        description: "description test",
        daily_rate: 100,
        fine_amount: 60,
        category_id: "catgory",
        brand: "brand",
        license_plate: "ABC-1234",
      })

      await createCarUseCase.execute({
        name: "Second Car",
        description: "description test 2",
        daily_rate: 1001,
        fine_amount: 60,
        category_id: "catgory",
        brand: "brand",
        license_plate: car.license_plate,
      })
    })
  })

  it("should be able to create an available car by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Second Car",
      description: "description test 2",
      daily_rate: 1001,
      fine_amount: 60,
      category_id: "catgory",
      brand: "brand",
      license_plate: "ABCD-123",
    })

    expect(car.available).toBe(true)
  })
})
