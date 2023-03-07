import { Auth } from '../models/auth'

export interface JsonProps {
  id: string
  name: string
  role: string
}

export const fromJsonToAuthMapper = (json: JsonProps): Auth => {
  return new Auth(json.id, json.name, json.role)
}
