import { DayjsDateProvider } from "../../../../shared/container/providers/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "../../../../shared/container/providers/in-memory/MailProviderInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it("shoud be able to send a password recovery mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail")
    const email = "sodfop@mail.com"

    await usersRepositoryInMemory.create({
      driver_license: "298913",
      name: "Jaiidk Aijfk",
      password: "912903jdsf",
      email,
    })

    await sendForgotPasswordMailUseCase.execute(email)

    expect(sendMail).toHaveBeenCalled()
  })

  it("should not be able to send email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("jdsuf@mail.com")
    ).rejects.toEqual(new AppError("User does not exist!"))
  })
})
