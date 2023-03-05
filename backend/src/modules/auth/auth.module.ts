import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthSchema, Auth } from 'src/schemas/auth.schema';
import { AuthService } from 'src/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guardians/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Auth.name ,schema: AuthSchema}]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: '20h'}
      }),
      
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AuthModule {}
