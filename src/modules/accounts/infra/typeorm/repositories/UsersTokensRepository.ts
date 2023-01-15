import { Repository } from "typeorm"

import AppDataSource from "../../../../../shared/infra/typeorm"
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO"
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository"
import { UserToken } from "../entities/UserToken"

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken)
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const token = await this.repository.findOne({
      where: { user_id, refresh_token },
    })

    return token
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = this.repository.findOne({
      where: { refresh_token: token },
    })

    return userToken
  }
}

export { UsersTokensRepository }
