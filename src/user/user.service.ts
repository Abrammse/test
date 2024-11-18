import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
constructor(
  @InjectRepository(User)  
  private readonly userRepository: Repository<User>
){}

async create(createUserDto: CreateUserDto) {
  const user = this.userRepository.create(createUserDto); 
  return this.userRepository.save(user); 
}
async findAll() {
  return this.userRepository.find(); 
}
async findOne(id: number) {
    return await this.userRepository.findOne( { where :{id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto); 
    return this.userRepository.save(user); 
  }

  async remove(id: number) {
    return  await this.userRepository.delete(id);
  }
}
