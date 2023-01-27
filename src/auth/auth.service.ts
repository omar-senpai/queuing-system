import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(authLoginDto: AuthLoginDto): Promise<Users> {
        const { email, password } = authLoginDto;
        const user = await this.usersService.findByEmail(email);
        if (!(await user?.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        return user;
    }
}