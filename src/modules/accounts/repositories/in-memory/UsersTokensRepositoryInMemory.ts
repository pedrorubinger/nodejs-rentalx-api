import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO"
import { UserToken } from "../../infra/typeorm/entities/UserToken"
import { IUsersTokensRepository } from "../IUsersTokensRepository"

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserToken[] = []

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === token
    )

    return userToken
  }

  async delete(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id)

    this.usersTokens.indexOf(userToken)
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find((ut) => ut.refresh_token === token)

    return userToken
  }
}

export { UsersTokensRepositoryInMemory }
