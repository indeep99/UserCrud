import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = this.usersService.getOneById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @ApiCreatedResponse({type: User})
    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<User> {
        return this.usersService.createUser(body);
    }

    @ApiCreatedResponse({type: User})
    @Put('update')
    updateUser (@Body() user: User): Promise<User> {
        return this.usersService.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.deleteUser(id);
    }
}
