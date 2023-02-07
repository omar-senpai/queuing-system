import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-update-user.dto';
import { Section } from 'src/enums/sections.enum';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
    constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) { }


    async create(createUserDto: CreateUserDto) {
        // check if user exist
        if (await this.isUserExist(createUserDto))
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'sorry this email or phone number already exist',
            }, HttpStatus.CONFLICT);

        createUserDto.email = createUserDto.email.toLocaleLowerCase();
        createUserDto.specialty = Object.values(Section)[createUserDto.specialty];
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
        const cachedData = await this.cacheService.get<Users>(id.toString());
        console.log(cachedData);
        if (cachedData) {
            console.log(`Getting data from cache!`);
            console.log(cachedData);
            return cachedData;
        }
        const user = await Users.findOne(id);;
        if (!user)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'user not found',
            }, HttpStatus.NOT_FOUND);
        delete user.password;
        await this.cacheService.set(id.toString(), user, { ttl: 30 });
        return user;
    }

    async getAllUsers() {
        const users = await Users.find();
        users.forEach(user => delete user.password);
        return users;
    }

    async findByEmail(email: string) {
        const cachedData = await this.cacheService.get<Users>(email.toString());
        console.log(cachedData);
        if (cachedData) {
            console.log(`Getting data from cache!`);
            console.log(cachedData);
            return cachedData;
        }
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
        await this.cacheService.set(email.toString(), user, { ttl: 30 });
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