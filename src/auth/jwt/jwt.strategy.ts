import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "*_DLt4i77Y6_LWZj",
        });
    }

    async validate(payload: { userId: number, roles: string }) {
        return {
            userId: payload.userId,
            roles: payload.roles,
        };
    }
}