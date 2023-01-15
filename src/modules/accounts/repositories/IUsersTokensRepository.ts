import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UserToken } from "../infra/typeorm/entities/UserToken"

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserToken>
  delete(id: string): Promise<void>
  findByRefreshToken(token: string): Promise<UserToken>
}

export { IUsersTokensRepository }
