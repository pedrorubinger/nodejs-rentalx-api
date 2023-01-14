import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { container } from "tsyringe"

import auth from "../../../../config/auth"
import { IUsersTokensRepository } from "../../../../modules/accounts/repositories/IUsersTokensRepository"
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
      auth.secret_refresh_token
    ) as IPayload

    const usersTokensRepository = container.resolve<IUsersTokensRepository>(
      "UsersTokensRepository"
    )
    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

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
