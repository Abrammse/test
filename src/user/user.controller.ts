import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}



