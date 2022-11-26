import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

import { AppError } from "../../../../errors/AppError"
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Invalid email or password!")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Invalid email or password!")
    }

    const token = sign({}, "e0024a23a35f09a46830486de54cb5f6", {
      subject: user.id,
      expiresIn: "1d",
    })

    return {
      user: { name: user.name, email },
      token,
    }
  }
}

export { AuthenticateUserUseCase }
