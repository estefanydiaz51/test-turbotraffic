import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { configLoader } from '../../config-loader'
import { envSchema } from 'src/schemas/joi/env.schema';


@Module({
  imports: [ AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ( configService: ConfigService) => {
        const mongoConfig = configService.get('mongo')
        return {
          uri: mongoConfig.uri
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
      validationSchema: envSchema,
    })
  ],
  providers: [],
})
export class AppModule {}
