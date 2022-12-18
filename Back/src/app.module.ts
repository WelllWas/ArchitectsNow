import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Request } from './requests/entities/request.entity';
import { RequestsModule } from './requests/requests.module';
require('dotenv').config();
const dbpass = process.env.DB_PASSWORD;


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'mouse.db.elephantsql.com',
      port: 5432,
      username: 'djbqlnol',
      password: dbpass,
      database: 'djbqlnol',
      entities: [User,Request],
      synchronize: true,
    }),
    UsersModule,
    RequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
