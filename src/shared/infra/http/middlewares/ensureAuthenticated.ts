import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { container } from "tsyringe"

import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository"
import { AppError } from "../../../errors/AppError"

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
    throw new AppError("Token is missing!", 401)
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
      throw new AppError("User does not exist!", 401)
    }

    request.user = {
      id: user_id,
    }

    next()
  } catch (err) {
    throw new AppError("Invalid token!", 401)
  }
}
