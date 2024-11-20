import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import * as fs from 'fs'; // For file system operations


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      
      storage: diskStorage({
        destination: './uploads', // Directory to save files
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix); // Set the filename
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
      
    }),
  )
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() image: Express.Multer.File) {
    return this.userService.create({...createUserDto, image: image.path});
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Directory to save files
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix); // Set the filename
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // Get the user from the database
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user has an old image and delete it
    if (user.image) {
      // Log the image path for debugging
      console.log('Deleting old image:', user.image);

      // Directly use the stored image path to check if it exists and delete it
      if (fs.existsSync(`./uploads/${user.image}`)) {
        fs.unlinkSync(`./uploads/${user.image}`); // Delete the old image
      } else {
        console.log('Old image not found:', `./uploads/${user.image}`); // Log if file doesn't exist
      }
    }

    // Construct the updated user data object
    const updatedUserData = {
      ...updateUserDto,
      image: image ? image.path : null, // If an image exists, include its path
    };

    // Call the update method in the service with the user ID and updated data
    return this.userService.update(+id, updatedUserData); // Update with ID and new data
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}



