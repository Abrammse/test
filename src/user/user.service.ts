import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodepassword,comparepassword } from './units/bycrypt';

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

  async delete (id: number) {
    const deleteResponse = await this.userRepository.softDelete(id);
    return deleteResponse
  }
  
  async login(username: string, password: string) {
    console.log("Inside login");
  
    // Log the username to ensure it's being passed correctly
    console.log("Username provided:", username);
  
    const user = await this.userRepository.findOne({
      where: { username },
    });
  
    if (user) {
      console.log("User found:", user);
  
      // Check if the provided password matches the stored password
      const matched = await comparepassword(password, user.password);
  
      if (matched) {
        return user;
      } else {
        throw new Error('Incorrect password');
      }
    } else {
      // If no user is found with the provided username
      console.log("User not found in the database.");
      throw new Error('User not found');
    }
  }
  

  async remove(id: number) {
    return  await this.userRepository.delete(id);
  }
}
