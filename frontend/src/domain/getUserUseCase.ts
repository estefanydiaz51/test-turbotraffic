import { AuthRepository } from '../data/repositories/auth.repository'

export class GetUserUseCase {
  constructor(private repository: AuthRepository) {}

  async call(name: string) {
    return this.repository.findAuthByName(name)
  }
}
