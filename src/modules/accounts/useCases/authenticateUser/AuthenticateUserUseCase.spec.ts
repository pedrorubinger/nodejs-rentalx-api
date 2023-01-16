import { v4 } from "uuid"

import { DayjsDateProvider } from "../../../../shared/container/providers/implementations/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      id: v4(),
      driver_license: "91298534",
      email: "john@mail.com",
      password: "john123",
      name: "John Doe",
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "12345",
      })
    ).rejects.toEqual(new AppError("Invalid email or password!"))
  })

  it("should not be able to authenticate an user using an incorrect password", async () => {
    const user: ICreateUserDTO = {
      id: v4(),
      driver_license: "145698830",
      email: "john2@mail.com",
      password: "john123",
      name: "John Doe Two",
    }

    await createUserUseCase.execute(user)

    expect(
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong_password",
      })
    ).rejects.toEqual(new AppError("Invalid email or password!"))
  })
})
