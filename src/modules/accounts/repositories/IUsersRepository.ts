import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { User } from "../infra/typeorm/entities/User"

interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(user_id: string): Promise<User>
}

export { IUsersRepository }
