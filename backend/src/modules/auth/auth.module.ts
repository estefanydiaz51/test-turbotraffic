import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthSchema, Auth } from 'src/schemas/auth.schema';
import { AuthService } from 'src/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name ,schema: AuthSchema}]),
    JwtModule.register({
      secret: 'SECRET_JWT',
      signOptions: { expiresIn: '20h'}
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
