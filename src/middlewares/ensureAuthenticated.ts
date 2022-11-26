import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { container } from "tsyringe"

import { IUsersRepository } from "../modules/accounts/repositories/IUsersRepository"

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error("Token is missing!")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(
      token,
      "e0024a23a35f09a46830486de54cb5f6"
    ) as IPayload

    const usersRepository =
      container.resolve<IUsersRepository>("UsersRepository")
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new Error("User does not exist!")
    }

    next()
  } catch (err) {
    throw new Error("Invalid token!")
  }
}
