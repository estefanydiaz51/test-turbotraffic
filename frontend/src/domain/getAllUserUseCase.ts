import { AuthRepository } from '../data/repositories/auth.repository'

export class GetAllUserUseCase {
  constructor(private repository: AuthRepository) {}

  async call(token: string) {
    return this.repository.getAllUsers(token)
  }
}
