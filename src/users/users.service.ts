import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }

//     private users: User[] = [
//     { id: 0, name: 'Indeep', something: 'Hello1' },
//     { id: 1, name: 'Indeep', something: 'Hello2' },
//     { id: 2, name: 'Jakub', something: 'Hello3' },
//   ];

//   findAll(name?: string): User[] {
//     if (name) {
//       return this.users.filter((user) => user.name === name);
//     }

//     return this.users;
//   }

//   findById(userId: number): User {
//     return this.users.find((user) => user.id === userId);
//   }

//   createUser(createUserDto: CreateUserDto): User {
//     const newUser = { id: Date.now(), ...createUserDto, something: 'hello4' };

//     this.users.push(newUser);

//     return newUser;
//   }

    getAll(): Promise<User[]> {
        return this.userRepository.find(); // Select * from user
    }

    async getOneById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOneOrFail(id);
            return user;
        } catch (err) {
            throw err;
        }
    }

    createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create({...createUserDto});
        
        return this.userRepository.save(newUser); //Insert
    }

    async updateUser(user: User): Promise<User> {
        const updatedUser = await this.getOneById(user.id);

        updatedUser.name = user.name;

        return this.userRepository.save(updatedUser); //Update
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.getOneById(id);

        return this.userRepository.remove(user);
    }
}
