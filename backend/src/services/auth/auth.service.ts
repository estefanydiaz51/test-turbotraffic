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
        HttpStatus.FORBIDDEN)
    }
  }

  async createUser( createUserDto: createUserDto) {
   try{
    const { name } = createUserDto;
    const findUser = await this.userRepository.findOne({name : name});

    if(name === 'Alejandro'){
      createUserDto.role = 'admin';
    } else{
      createUserDto.role = 'user';
    }

    if(findUser) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'El usuario ya existe'},
        HttpStatus.FORBIDDEN
      )
    }
    const newUser = await this.userRepository(createUserDto);
    const token = this.jwtAuthService.sign({
      name: newUser.name,
      role: newUser.role
    });

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
      HttpStatus.FORBIDDEN
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

      const token = this.jwtAuthService.sign({
        name: user.name,
        role: user.role
      })
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
        HttpStatus.FORBIDDEN)
    }
  }
}
