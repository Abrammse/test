import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodepassword } from './units/bycrypt';

@Injectable()
export class UserService {
constructor(
  @InjectRepository(User)  
  private readonly userRepository: Repository<User>
){}

async create(createUserDto: CreateUserDto) {
  const password = await encodepassword(createUserDto.password);
  console.log( password);
  const user = this.userRepository.create({...createUserDto,password } ); 
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
