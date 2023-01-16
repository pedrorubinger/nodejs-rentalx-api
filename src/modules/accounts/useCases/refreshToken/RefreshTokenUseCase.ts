import { decode, sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

import auth from "../../../../config/auth"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  refresh_token: string
  token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload
    const user_id = sub
    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      )

    if (!userToken) {
      throw new AppError("Refresh token does not exist!")
    }

    await this.usersTokensRepository.delete(userToken.id)

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      auth.expires_in_refresh_token_days
    )
    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    })

    await this.usersTokensRepository.create({
      expires_date: refreshTokenExpiresDate,
      refresh_token: refreshToken,
      user_id,
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    })

    return { refresh_token: refreshToken, token: newToken }
  }
}

export { RefreshTokenUseCase }
