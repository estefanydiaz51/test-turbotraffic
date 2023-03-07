import { Auth } from '../models/auth'

export interface AuthRepository {
  getAllUsers(token:string): Promise<Auth[]>
  findAuthByName(name: string): Promise<any>
  createUser(name: string): Promise<any>
}
