import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Carro 1",
      description: "car description",
      daily_rate: 110,
      fine_amount: 299,
      category_id: "0d77f077-ded4-4e1f-bdeb-e06439e33fb0",
      brand: "Car brand",
      license_plate: "PDK-9202",
    })

    const cars = await listAvailableCarsUseCase.execute()

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Carro 2",
      description: "car description 2",
      daily_rate: 110,
      fine_amount: 299,
      category_id: "0d77f077-ded4-4e1f-bdeb-e06439e33fb0",
      brand: "Car brand 2",
      license_plate: "PDK-9205",
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car brand 2",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Carro 3",
      description: "car description 3",
      daily_rate: 110,
      fine_amount: 299,
      category_id: "0d77f077-ded4-4e1f-bdeb-e06439e33fb0",
      brand: "Car brand 3",
      license_plate: "PDK-9206",
    })

    const cars = await listAvailableCarsUseCase.execute({ name: "Carro 3" })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Carro 4",
      description: "car description 4",
      daily_rate: 110,
      fine_amount: 299,
      category_id: "12340d77f077-ded4-4e1f-bdeb-e06439e33fb0",
      brand: "Car brand 4",
      license_plate: "PDK-9207",
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12340d77f077-ded4-4e1f-bdeb-e06439e33fb0",
    })

    expect(cars).toEqual([car])
  })
})
