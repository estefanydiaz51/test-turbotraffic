import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
