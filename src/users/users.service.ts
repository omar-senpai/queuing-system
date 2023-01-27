import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-update-user.dto';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        // check if user exist
        if (await this.isUserExist(createUserDto))
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'sorry this email or phone number already exist',
            }, HttpStatus.CONFLICT);

        createUserDto.email = createUserDto.email.toLocaleLowerCase();
        const user = Users.create(createUserDto);
        await user.save();

        delete user.password;
        return user;
    }

    async update(id: string, createUserDto: CreateUserDto) {
        const user = await Users.findOne({ where: { id } });
        if (!user)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'user not found',
            }, HttpStatus.NOT_FOUND);
        try {
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.email = createUserDto.email;
            user.phoneNumber = createUserDto.phoneNumber;
            user.password = createUserDto.password;
            await user.save();
            delete user.password;
            return user;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'sorry this email or phone number already exist',
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string) {
        const user = await Users.findOne(id);
        if (!user)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'user not found',
            }, HttpStatus.NOT_FOUND);
        await user.remove();
        return { message: 'user deleted successfully' };
    }



    async getById(id: number): Promise<Users> {
        const user = await Users.findOne(id);;
        if (!user)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'user not found',
            }, HttpStatus.NOT_FOUND);
        delete user.password;
        return user;
    }

    async getAllUsers() {
        const users = await Users.find();
        users.forEach(user => delete user.password);
        return users;
    }

    async findByEmail(email: string) {
        const user = await Users.findOne({
            where: {
                email: email.toLocaleLowerCase(),
            },
        });
        if (!user)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'user not found',
            }, HttpStatus.NOT_FOUND);
        return user
    }

    async isUserExist(userInfo: CreateUserDto) {
        return await Users.findOne({
            where: [
                { email: userInfo.email.toLocaleLowerCase() },
                { phoneNumber: userInfo.phoneNumber },
            ]
        });
    }
}