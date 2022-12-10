import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it("should be able to create a new specification that does not exist", async () => {
    expect(async () => {
      const car_id = "123"
      const specifications_id = ["5231"]

      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "description test",
      daily_rate: 100,
      fine_amount: 60,
      category_id: "catgory",
      brand: "brand",
      license_plate: "ABC-1234",
    })
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "specification test",
    })
    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })

    expect(specificationsCars).toHaveProperty("specifications")
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
