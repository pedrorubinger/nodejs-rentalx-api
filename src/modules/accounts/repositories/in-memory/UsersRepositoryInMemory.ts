import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { User } from "../../infra/typeorm/entities/User"
import { IUsersRepository } from "../IUsersRepository"

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create({
    driver_license,
    email,
    name,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, { driver_license, id, email, name, password, avatar })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(user_id: string): Promise<User> {
    return this.users.find((user) => user.id === user_id)
  }
}

export { UsersRepositoryInMemory }
