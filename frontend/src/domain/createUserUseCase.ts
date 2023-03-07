import { AuthRepository } from '../data/repositories/auth.repository'

export class CreateUserUseCase {
  constructor(private repository: AuthRepository) {}

  async call(name: string) {
    return this.repository.createUser(name)
  }
}
