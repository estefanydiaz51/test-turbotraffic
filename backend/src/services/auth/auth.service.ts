import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from 'src/controllers/auth/dto/createUser.dto';
import { Auth } from 'src/schemas/auth.schema';

@Injectable()
export class AuthService {


  constructor(
    @InjectModel(Auth.name) private userRepository,
    private jwtAuthService: JwtService
  ){}

  async getUsers() {
    try{
      return await this.userRepository.find()
    }catch(error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Server Error'},
        HttpStatus.FORBIDDEN, {
          cause: error
        })
    }
  }

  async createUser( createUserDto: createUserDto) {
   try{
    const { name } = createUserDto
    const findUser = await this.userRepository.findOne({name : name})
    if(findUser) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'El usuario ya existe'},
        HttpStatus.FORBIDDEN
      )
    }
    const newUser = await this.userRepository(createUserDto)
    const token = this.jwtAuthService.sign(createUserDto)
    await newUser.save()
    const resp = {
      ...createUserDto,
      token
    }
    return resp
   } catch(error){
     throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'El usuario ya existe'},
      HttpStatus.FORBIDDEN, {
        cause: error
      }
    )
   }
  }

  async login( name: {}){
    try {
      const user = await this.userRepository.findOne(name)
      if(!user) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'Usuario no encontrado'},
          HttpStatus.FORBIDDEN)
      }

      const token = this.jwtAuthService.sign({user})
      const resp = {
        id: user.id,
        name: user.name,
        role: user.role,
        token
      } 
      return resp
    }catch(error){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Usuario no encontrado'},
        HttpStatus.FORBIDDEN, {
          cause: error
        })
    }
  }
}
