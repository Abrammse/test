import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { Repository } from 'typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([User])],  
  controllers: [UserController],
  providers: [UserService, Repository],


})
export class UserModule {}
