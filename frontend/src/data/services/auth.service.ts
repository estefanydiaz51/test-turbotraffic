import { Auth } from '../models/auth'
import { AuthRepository } from '../repositories/auth.repository'
import { Router } from '../../common/utils'
import {
  fromJsonToAuthMapper,
  JsonProps,
} from '../mappers/fromJsonToAuth.mapper'

const BASE_URL = 'http://localhost:3001'

export class AuthService implements AuthRepository {
  async getAllUsers(token: string): Promise<Auth[]> {
    return await fetch(BASE_URL + Router.auth, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => data ? data.map((item: JsonProps) => fromJsonToAuthMapper(item)): null)
      .catch((error) => error)
  }

  async findAuthByName(name: string): Promise<any> {
    const response = await fetch(BASE_URL + Router.auth,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
      }).then((resp) => resp.json())
    return response
  }

  async  createUser(name: string): Promise<any> {
    const response = await fetch(BASE_URL + Router.new,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
      }).then((resp) => resp.json())
    return response
  }
}
