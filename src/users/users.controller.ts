
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.usersService.update(id, createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}