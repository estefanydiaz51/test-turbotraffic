import { Controller, Get, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { AuthService } from '../../services/auth/auth.service'
import { User } from 'src/interfaces/Auth';
import { JwtAuthGuard } from 'src/guardians/jwtAuth.guard';
import { JoiValidationPipe } from 'src/pipes/joiValidation.pipe';
import { CreateUserSchema, LoginSchema } from 'src/schemas/joi/auth.shema';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';


@Controller('auth')
export class AuthController {

  constructor( private authService: AuthService) {}
  @Post('/new')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  createUser(@Body() user: createUserDto): Promise<User> {
    return this.authService.createUser(user)
  }

  @Post('/')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  getUser(@Body() name: {} ): Promise<User>{
    return this.authService.login(name)
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('/')
  getUsers():Promise<User[]> {
    return this.authService.getUsers()
  }
}
