import { useState } from 'react'
import { Auth } from '../data/models/auth'
import { AuthService } from '../data/services/auth.service'
import { GetAllUserUseCase, CreateUserUseCase, GetUserUseCase } from '../domain'

export const useUser = () => {
  const [data, setData] = useState<Auth[]>([])
  const useCase = new GetAllUserUseCase(new AuthService())
  const createUseCase = new CreateUserUseCase(new AuthService())
  const getUseCase = new GetUserUseCase(new AuthService())


  const getUsers = (token: string) => {
    useCase.call(token).then((users) => {
      setData(users)
    }).catch(error => error)
  }

  const addUser = (name: string) => {
    return createUseCase.call(name).then((resp) => resp )
  }

  const findUser = (name: string) => {
    return getUseCase.call(name).then((resp: any) => resp )
  }

  return { users: data, addUser, findUser, getUsers }
}
